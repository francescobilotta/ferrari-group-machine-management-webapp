# PHP 5.6 No-Framework Backend

This is the boilerplate code of a simple rest API created without any framework.

## Why do I have created it?

I personally need it for some legacy PHP projects at work.

## What does this backend include?

- Front controller (index.php in public folder)
- Composer
- Error handling
- Http interface
- Advanced routing system (dispatch to a class + inversion of control)
- Dependency injector

## How to configure it?

In Controllers files: you can either get HTML or JSON back, it's up to you to choose. (JSON for APIs by the way)

Bootstrap.php:

- \$environment: production or development?
- \$prefixPath: putting the url string before "paths"

\$prefixPath exists due to many projects being on the same server, and then path changes on a per-project basis.

For example this url: http://localhost/php-5.6-no-framework-backend/public/index.php/?name=Francesco%20Bilotta
The \$prefixPath is http://localhost/php-5.6-no-framework-backend/public/index.php

## How to use it?

Run: composer update
Visit http://localhost/your-folder/public/index.php/?name=your%20name as an example.
