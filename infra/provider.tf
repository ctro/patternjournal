provider "google" {
  // Just use Packer's for now.
  credentials = "${file("../image/serviceAdminAccount.json")}"
  project     = "Pattern Journal"
  region      = "us-central1"
}
