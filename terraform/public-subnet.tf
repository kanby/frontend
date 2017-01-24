resource "aws_internet_gateway" "default" {
  vpc_id = "${aws_vpc.default.id}"
}

resource "aws_subnet" "public" {
  vpc_id                  = "${aws_vpc.default.id}"
  count                   = "${length(split(",", lookup(var.azs, var.region)))}"
  cidr_block              = "${cidrsubnet(var.public_subnet_cidr, 4, count.index)}"
  availability_zone       = "${element(split(",", lookup(var.azs, var.region)), count.index)}"
  map_public_ip_on_launch = true

  tags {
    "Name" = "private-${element(split(",", lookup(var.azs, var.region)), count.index)}-sn"
  }
}

resource "aws_route_table" "public" {
  vpc_id = "${aws_vpc.default.id}"

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.default.id}"
  }
}

resource "aws_route_table_association" "public" {
  count          = "${length(split(",", lookup(var.azs, var.region)))}"
  subnet_id      = "${element(aws_subnet.public.*.id, count.index)}"
  route_table_id = "${aws_route_table.public.id}"
}
