{ pkgs ? import <nixpkgs> {} }:  
pkgs.mkShell {
  buildInputs = with pkgs; [
    tmux
    nodejs_22
    nodePackages.pnpm
    sqlite
    turso-cli
    redis
  ];
  shellHook = ''
    alias sqlite=sqlite3
    (&>/dev/null redis-server &)
  '';
}

