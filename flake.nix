{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = inputs:
    inputs.flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = import (inputs.nixpkgs) {inherit system;};
      in {
        devShell = pkgs.mkShell {
          buildInputs = [
            pkgs.nodejs_22
            pkgs.nodePackages.typescript
            pkgs.nodePackages.typescript-language-server
            pkgs.awscli
            pkgs.aws-sam-cli
          ];
        };
      }
    );
}
