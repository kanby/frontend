provider "aws" {
  region                  = "${var.region}"
  profile                 = "${var.profile}"
  shared_credentials_file = "${path.root}/aws.credentials"
}

resource "aws_vpc" "default" {
  cidr_block           = "${var.vpc_cidr}"
  enable_dns_hostnames = true

  tags {
    Name = "kanby-vpc"
  }
}
