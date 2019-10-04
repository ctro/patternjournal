variable "image_id" {
  type = string
}

resource "google_compute_address" "pj_web_static_ip" {
  name = "pj-web-static-ip"
}

resource "google_compute_instance" "pj_web_vm" {
  name         = "pj-web"
  // ~$15/mo
  machine_type = "g1-small"

  boot_disk {
    initialize_params {
      image = var.image_id
    }
  }

  network_interface {
    # A default network is created for all GCP projects
    network       = "default"
    access_config {
      nat_ip = "${google_compute_address.pj_web_static_ip.address}"
    }
  }

  # There are existing firewall rules we can use, just set tags I guess.
  tags = ["http-server", "https-server"]
}
