{pkgs}: {
  deps = [
    pkgs.postgresql
    pkgs.jq
    pkgs.mongosh
    pkgs.dig
    pkgs.rsync
  ];
}
