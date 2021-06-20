# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] - 2021-06-20

## Added
 -   Agregar endpoint en la API para permitir borrar un movimiento. Conectar con la función ya realizada del modelo.
 -   Agregar campo description al modelo.
 -   Agregar signo + y -.

 ## Fixed
 -   Arreglar el formato de los montos en las tablas. Si le pasan un número con “,” rompe el formato.

## [1.1.0] - 2021-06-16

### Added

-   Se agregó alerta que indique que un movimiento se guardó con éxito al crear el movimiento
-   Se creaó vista de egresos de manera análoga a la tabla de ingresos.

### Fixed

-   Se arregló los headers de la card de los gráficos
-	Se arregló el problema que hace que todos los movimientos se creen con la fecha de hoy.
-	Ya no hay que hacer refresh al crear un movimiento, para que aparezca reflejado en la lista.

## [1.0.1] - 2021-05-03

### Added

-   Cypress detection for running tests on memory
-   Cypress seed before each cypress test

### Changed

-   Creates tables on server init and avoids erase on shutdown

### Removed

-   Cypress experimental configuration

## [1.0.0] - 2021-04-26

### Added

-   Movements API
-   Home UI with charts and last movements
-   Incomes UI with last incomes

[unreleased]: https://github.com/rodrigomiguelfm/gitapp/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/rodrigomiguelfm/gitapp/releases/tag/v1.2.0
[1.1.0]: https://github.com/rodrigomiguelfm/gitapp/releases/tag/v1.1.0
[1.0.1]: https://github.com/rodrigomiguelfm/gitapp/releases/tag/v1.0.1
[1.0.0]: https://github.com/rodrigomiguelfm/gitapp/releases/tag/v1.0.0
