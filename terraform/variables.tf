variable "profile" {
  type        = "string"
  description = "AWS profile."
  default     = "default"
}

variable "region" {
  type        = "string"
  description = "AWS region."
  default     = "eu-west-2"
}

variable "azs" {
  default = {
    "eu-west-2" = "eu-west-2a,eu-west-2b"
  }

  description = "AWS availability zones in defined region to support."
}

variable "ami" {
  default = "ami-bfe0eadb"
  description = "Machine Image to use"
}

variable "vpc_cidr" {
  description = "CIDR for VPC"
  default     = "10.128.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR for public subnet"
  default     = "10.128.0.0/24"
}

variable "private_subnet_cidr" {
  description = "CIDR for private subnet"
  default     = "10.128.1.0/24"
}
