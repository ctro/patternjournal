variable "image_id" {
  type = string
}

resource "google_compute_instance" "pj_web" {
  name         = "pj_web"
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
    }
  }
}
