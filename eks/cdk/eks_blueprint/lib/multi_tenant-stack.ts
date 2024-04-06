import { AsgClusterProviderProps } from '@aws-quickstart/eks-blueprints';
import * as cdk from 'aws-cdk-lib';
import { InstanceType } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as blueprints from '@aws-quickstart/eks-blueprints';
import { UpdatePolicy } from 'aws-cdk-lib/aws-autoscaling';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MultiTenantStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const app = new cdk.App();
    const account = 'xxxxxxxxxxx';
    const region = 'us-east-1';
    const version = eks.KubernetesVersion.V1_29;
    blueprints.HelmAddOn.validateHelmVersions = true; // optional if you would like to check for newer versions

    const AwsLoadBalancerControllerAddOn = new blueprints.addons.AwsLoadBalancerControllerAddOn();
    const KubeProxyAddOn = new blueprints.addons.KubeProxyAddOn()
    const CoreDnsAddOn = new blueprints.addons.CoreDnsAddOn()
    const VpcCniAddOn = new blueprints.addons.VpcCniAddOn()
    const ArgoCDAddOnGitOps = new blueprints.addons.ArgoCDAddOn({
      namespace: "public",
      values: {
        "nameOverride": "ovg-gitops",
        "global": {
          "logging":{
            "level": "debug"
          }
        },
        "configs": {
        }, 
        "server": {
          "ingress": {
            "enabled": "true",
            "annotations": {
              "alb.ingress.kubernetes.io/backend-protocol": "HTTPS"
            },
            "ingressClassName": "alb",
            "hosts": [
            ],
            "tls": [{
              "secretName": "argocd-tls",
              "hosts": [
              ]
            }
            ]
          }
        }
      }
    })

    const certificateAddon = new blueprints.addons.CertManagerAddOn()

    const addOns: Array<blueprints.ClusterAddOn> = [
      new blueprints.addons.CalicoOperatorAddOn(),
      new blueprints.addons.MetricsServerAddOn(),
      new blueprints.addons.ClusterAutoScalerAddOn(),
      AwsLoadBalancerControllerAddOn,
      VpcCniAddOn,
      CoreDnsAddOn,
      KubeProxyAddOn,
      new blueprints.addons.ExternalDnsAddOn({
        hostedZoneResources: ["MyHostedZone1"]
      }),
      certificateAddon,
      ArgoCDAddOnGitOps
    ];


    const propsAsg: AsgClusterProviderProps = {
      minSize: 2,
      maxSize: 4,
      desiredSize: 2,
      version: version,
      instanceType: new InstanceType('m5.large'),
      machineImageType: eks.MachineImageType.AMAZON_LINUX_2,
      updatePolicy: UpdatePolicy.rollingUpdate(),
      id: 'firstNodeGroup',
    }
    
    const clusterProvider = new blueprints.AsgClusterProvider(propsAsg);
    const parentDnsAccountId = '292130268450';


    //new blueprints.EksBlueprint(scope, { id: 'blueprint', clusterProvider });
    const stack = blueprints.EksBlueprint.builder()
      .clusterProvider(clusterProvider)
      .resourceProvider("ovg-cert", new blueprints.ImportCertificateProvider("arn:aws:acm:us-east-1:292130268450:certificate/b74d37aa-8b6f-47df-b1fd-648ae322e912", "ovg-cert"))
      .resourceProvider("MyHostedZone1",  new blueprints.DelegatingHostedZoneProvider({
        parentDomain: 'ovg-sandbox.com',
        subdomain: 'sb.ovg-sandbox.com', 
        parentDnsAccountId: parentDnsAccountId, // Fixed the property name
        delegatingRoleName: 'DomainOperatorRole',
        wildcardSubdomain: true
    }))
    .addOns()
      .account(account)
      .region(region)
      .version(version)
      .addOns(...addOns)
      .useDefaultSecretEncryption(true)
    .build(app, 'eks-ovg');
  }
}
