provider "google" {
  // Just use Packer's for now.
  credentials = "${file("../image/serviceAdminAccount.json")}"
  project     = "pattern-journal-1568127981392"
  region      = "us-central1"
  zone        = "us-central1-a"
}
