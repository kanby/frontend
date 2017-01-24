# kanby/frontend

[![Build Status](https://circleci.com/gh/kanby/frontend.svg?style=shield)](https://circleci.com/gh/kanby/frontend)

### Running the application

`yarn`
`yarn build`
`yarn start`

#### Provisioning

The infrastructure is provisioned via Terraform.

To get started managing it:

1. Install the `terraform` cli for your system
2. Run the following commands to set up remote state (so everybody has infrastructure state in sync):
  - `terraform remote config -backend=s3 -backend-config="bucket=kanby-state-dev" -backend-config="key=network/terraform.tfstate" -backend-config="region=eu-west-2" -backend-config="shared_credentials_file=./terraform/aws.credentials"`
  - `terraform remote pull` (probably done automatically)
