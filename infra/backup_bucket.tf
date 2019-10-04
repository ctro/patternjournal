// Google Storage bucket for uploading DB Backups.

resource "google_storage_bucket" "patternjournal_postgres_backups" {
  name     = "patternjournal_postgres_backups"

  // US Multi-Region
  location = "us"

  // Medium
  storage_class = "NEARLINE"
  
  // One policy for the whole bucket
  bucket_policy_only = true

  retention_policy {
    // in seconds, a little more than a year.
    retention_period = 33333333
  }
}
