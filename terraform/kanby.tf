data "terraform_remote_state" "state" {
  backend = "s3"

  config {
    bucket                  = "kanby-state-dev"
    key                     = "network/terraform.tfstate"
    region                  = "${var.region}"
    profile                 = "${var.profile}"
    shared_credentials_file = "${path.root}/aws.credentials"
  }
}
