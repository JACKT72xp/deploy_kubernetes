# Deploy Kubernetes - A Multi-Cloud Managed Services Repository

## Introduction

The `deploy_kubernetes` repository serves as a comprehensive resource for deploying managed Kubernetes services across multiple cloud providers. By collating a variety of Infrastructure as Code (IAC) templates and examples, we aim to build a community-driven library that empowers developers and organizations to launch and manage Kubernetes clusters with best practices and ease.

## Our Mission

We believe in democratizing the complexity of cloud-native technologies. By providing well-documented, reusable, and community-vetted templates, we help accelerate the adoption of Kubernetes across different environments, fostering innovation and operational efficiency.

## Repository Structure

This repository is organized by cloud service provider, each containing subdirectories for different IAC tools:

.
├── aks (Azure Kubernetes Service)
│ ├── azure_cli (To Be Completed)
│ ├── bicep (To Be Completed)
│ └── terraform (To Be Completed)
├── eks (Amazon Elastic Kubernetes Service)
│ ├── cdk
│ │ ├── eks (To Be Completed)
│ │ └── eks_blueprint (Completed - See Below)
│ │ ├── bin
│ │ ├── cdk.out
│ │ ├── lib
│ │ └── test
│ ├── eksctl (To Be Completed)
│ └── terraform (To Be Completed)
└── gks (Google Kubernetes Engine)
├── pulumi (To Be Completed)
└── terraform (To Be Completed)



## Highlighted Example: EKS Blueprint

Within the `eks/cdk/eks_blueprint` directory, you'll find a fully fleshed out example that showcases the use of AWS CDK EKS Blueprints to create a robust, scalable, and secure EKS cluster. This template includes:

- A collection of essential add-ons pre-configured for immediate use.
- Integration of AWS security best practices.
- An example application to demonstrate deployment and management.
- Detailed instructions for set-up and customization.

This blueprint is an embodiment of our commitment to provide the community with reliable and production-ready code.

## Planned Examples and Templates

- **AKS with Azure CLI**: Automate your AKS deployments with native Azure command-line tools.
- **AKS with Bicep**: Define your AKS infrastructure as code with Azure's Bicep language.
- **AKS with Terraform**: Leverage Terraform to provision AKS clusters declaratively.
- **EKS with eksctl**: Use eksctl for a simple CLI experience for creating and managing EKS clusters.
- **EKS with Terraform**: Apply Terraform to define and manage EKS infrastructure.
- **GKE with Pulumi**: Utilize Pulumi to programatically create and manage GKE clusters.
- **GKE with Terraform**: Implement GKE deployment with the power of Terraform.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. If you have a specific Managed Kubernetes Service expertise or experience with IAC tools, your insights and contributions are welcome.

## Getting Started

To use the examples in this repository:

1. Clone the repository.
2. Navigate to the specific cloud provider and IAC tool directory.
3. Follow the README within each directory for detailed instructions.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Support and Contact

Have questions or need support? Please open an issue, and we will be glad to help you out.

---

Deploy your Kubernetes clusters confidently and with community support using `deploy_kubernetes`.
