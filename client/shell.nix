{ pkgs ? import <nixpkgs> {} }:  
pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_22
    nodePackages.pnpm
    sqlite
    turso-cli
  ];
  shellHook = ''
    alias sqlite=sqlite3
  '';
}

