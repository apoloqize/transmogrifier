{ pkgs, config, lib, ... }:

let
  # Define Node.js version. You can adjust this as needed.
  # Check available versions in nixpkgs, e.g., pkgs.nodejs-18_x, pkgs.nodejs-20_x
  # Using nodejs_20 as an example, ensure it matches your project's requirements.
  # Your package.json indicates Node.js 18.17.0 or later.
  # Your Dockerfile uses node:18-alpine. Let's stick to Node 18 for consistency.
  nodeJs = pkgs.nodejs-18_x;
  # If you prefer Yarn over npm, you can add it here:
  # yarn = pkgs.yarn;
in
{
  # Environment variables
  env.NODE_ENV = "development";

  # Packages needed for your development environment
  packages = [
    nodeJs      # Node.js (includes npm)
    # yarn      # Uncomment if you use Yarn
    pkgs.git    # Git for version control
    # Add other tools you commonly use, e.g.:
    # pkgs.jq     # For JSON processing
    # pkgs.ripgrep # For searching code
  ];

  # Language support
  languages.javascript = {
    enable = true;
    # Specify the Node.js package to use for JavaScript/TypeScript support
    package = nodeJs;
    # If you use npm for global packages in your dev workflow (e.g., create-next-app),
    # you might want to configure corepack or npm.
    # devenv has built-in support for npm, yarn, pnpm.
    # By default, if a package-lock.json, yarn.lock, or pnpm-lock.yaml is present,
    # devenv will try to use the respective package manager.
    # Your project has package-lock.json, so npm should be picked up.
  };

  # Scripts available in the devenv shell
  scripts = {
    # Replicates scripts from your package.json for convenience
    dev.exec = "npm run dev";
    build.exec = "npm run build";
    start.exec = "npm run start";
    lint.exec = "npm run lint";
    test.exec = "npm run test";
    # You can add custom scripts here too
    # my-custom-script.exec = "echo 'Hello from devenv script!'";
  };

  # Commands to run when entering the shell
  enterShell = ''
    echo "Welcome to the Transmogrifier (devenv) environment!"
    echo "Node.js version: $(node --version)"
    echo "npm version: $(npm --version)"
    # echo "Yarn version: $(yarn --version)" # Uncomment if using Yarn
    echo "Available scripts: devenv run <script_name>"
    echo "  (dev, build, start, lint, test)"
    # Automatically install npm dependencies if node_modules is missing or package-lock.json changed
    # This is a common pattern, but devenv might handle this with its language support.
    # For explicit control:
    if [ ! -d "node_modules" ] || [ "package-lock.json" -nt "node_modules/.package-lock-stamp" ]; then
      echo "Installing/updating npm dependencies..."
      npm install
      touch -r package-lock.json node_modules/.package-lock-stamp
    fi
  '';

  # Optional: Pre-commit hooks using https://devenv.sh/pre-commit-hooks/
  # pre-commit.hooks = {
  #   eslint.enable = true;
  #   prettier.enable = true;
  #   # Add other hooks as needed
  # };

  # Optional: Services to run, e.g., a database if your app needed one
  # services.postgres.enable = true;

  # https://devenv.sh/tests/
  # Defines tests that can be run with `devenv test`
  # enterTest = ''
  #   echo "Running project tests via devenv..."
  #   npm test
  # '';
}
