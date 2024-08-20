-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 23, 2024 at 09:29 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `logistica`
--

-- --------------------------------------------------------

--
-- Table structure for table `almacens`
--

CREATE TABLE `almacens` (
  `id` int(11) NOT NULL,
  `id_detalle_pedido` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `id_compra` int(11) NOT NULL,
  `producto` varchar(100) NOT NULL,
  `stock_actual` varchar(50) NOT NULL,
  `numero_factura` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `almacens`
--

INSERT INTO `almacens` (`id`, `id_detalle_pedido`, `id_categoria`, `id_compra`, `producto`, `stock_actual`, `numero_factura`) VALUES
(1, 0, 0, 0, 'Manzanas', '15', 0),
(2, 0, 0, 0, 'Naranjas', '20', 0),
(4, 0, 0, 0, 'Pollo entero', '10', 0),
(5, 0, 0, 0, 'Carne de res', '10', 0),
(6, 0, 0, 0, 'Papa amarilla', '30', 0),
(7, 0, 0, 0, 'Cebolla ', '22', 0),
(8, 0, 0, 0, 'huevo', '30', 0);

-- --------------------------------------------------------

--
-- Table structure for table `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `fecha_creación` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categorias`
--

INSERT INTO `categorias` (`id`, `categoria`, `estado`, `fecha_creación`) VALUES
(1, 'Lácteos ', 'activo', '0'),
(2, 'Citricos', 'activo', '0'),
(3, 'Mariscos', 'inactivo', '0'),
(4, 'Tuberculos', 'espera', '0'),
(5, 'Verduras', 'inactivo', '0');

-- --------------------------------------------------------

--
-- Table structure for table `chefs`
--

CREATE TABLE `chefs` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `telefono` varchar(9) NOT NULL,
  `dni` varchar(8) NOT NULL,
  `email` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chefs`
--

INSERT INTO `chefs` (`id`, `nombre`, `apellido`, `telefono`, `dni`, `email`) VALUES
(1, 'Raúl', 'Portugal Padilla', '923746237', '00052693', 'raulp@gmail.com'),
(2, 'Ray Weider', 'Díaz Tineo', '961730358', '75889701', 'raydiaztineo171@gmail.com'),
(3, 'Emilio', 'López López ', '956789012', '23456789', 'emilio@gmail.com'),
(4, 'Jahaira', 'Pinedo Torres', '978901234', '45678901', 'jahaira@gmail.com'),
(5, 'María', 'García López', '987654321', '90123456', 'maria@gmail.com'),
(6, 'Ernesto', 'Pazos Pazos', '654321987', '74559612', 'ernesto@gmail.com'),
(8, 'Juan Carlos', 'Vargas Lopez', '965765433', '00085412', 'juancarlos@gmail.com'),
(15, 'samuel', 'chota ', '979330767', '71705982', 'samuel@gmail.com'),
(17, 'juan', 'vargas', '961730458', '00086988', 'juanv@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `compras`
--

CREATE TABLE `compras` (
  `id_compra` int(11) NOT NULL,
  `id_detalle_compra` int(11) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `fecha_compra` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detallecompras`
--

CREATE TABLE `detallecompras` (
  `id` int(11) NOT NULL,
  `proveedor` varchar(250) NOT NULL,
  `encargado_compra` varchar(250) NOT NULL,
  `numero_factura` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detallecompras`
--

INSERT INTO `detallecompras` (`id`, `proveedor`, `encargado_compra`, `numero_factura`) VALUES
(1, 'Distribuidora Gastronómica Perú', 'Cristofer Ramires Tuanama', 4256235),
(2, 'Proveedores de Insumos Gourmet S.A.C.', '	Cristofer Ramires Tuanama', 2458964),
(3, 'Cocina Directa S.R.L.', '	Cristofer Ramires Tuanama', 4578212),
(4, 'Abastecedora Gourmet Peruana', '	Cristofer Ramires Tuanama', 8963521),
(5, 'Insumos y Utensilios de Cocina Elegance', '	Cristofer Ramires Tuanama', 3652147),
(6, 'Mayorista de Equipamiento Gastronómico', '	Cristofer Ramires Tuanama', 7852369),
(7, 'Distribuidora de Productos Frescos para Cocina', '	Cristofer Ramires Tuanama', 6325891),
(8, 'Proveedor Chef Express', '	Cristofer Ramires Tuanama', 5823146),
(9, 'Distribuidora de Ingredientes Culinarios', '	Cristofer Ramires Tuanama', 7418529);

-- --------------------------------------------------------

--
-- Table structure for table `detallepedidos`
--

CREATE TABLE `detallepedidos` (
  `id_detalle_pedido` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `producto` varchar(100) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `unidMed` varchar(10) NOT NULL,
  `fecha_entrega` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `detallereceta`
--

CREATE TABLE `detallereceta` (
  `idDetalleReceta` int(11) NOT NULL,
  `idReceta` int(11) DEFAULT NULL,
  `idIngrediente` int(11) DEFAULT NULL,
  `cantidadNecesaria` int(11) NOT NULL,
  `unidadMedida` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `detallereceta`
--

INSERT INTO `detallereceta` (`idDetalleReceta`, `idReceta`, `idIngrediente`, `cantidadNecesaria`, `unidadMedida`) VALUES
(1, 1, 1, 5, 'unidades'),
(2, 1, 2, 2, 'tazas'),
(3, 1, 3, 1, 'taza'),
(4, 1, 4, 3, 'unidades'),
(5, 2, 1, 4, 'unidades'),
(6, 2, 3, 1, 'taza'),
(9, NULL, 2, 52, ''),
(38, 29, 4, 2, 'unidades'),
(39, 29, 14, 4, 'unidades'),
(40, 29, 6, 2, 'kg'),
(41, 29, 11, 1, 'unidades'),
(42, 29, 16, 1, 'unidades'),
(43, 30, 29, 3, 'kg.'),
(44, 30, 28, 2, 'Cucharadas'),
(45, 30, 30, 1, 'tazas'),
(46, 30, 4, 2, 'unidades'),
(47, 31, 7, 2, 'unidades'),
(48, 31, 14, 4, 'unidades'),
(49, 31, 11, 2, 'unidades'),
(50, 31, 6, 2, 'kg.'),
(51, 32, 2, 2, 'tazas');

-- --------------------------------------------------------

--
-- Table structure for table `ingredientes`
--

CREATE TABLE `ingredientes` (
  `idIngrediente` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `cantidadDisponible` int(11) NOT NULL,
  `unidadMedida` varchar(20) NOT NULL,
  `fecha_de_vencimiento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ingredientes`
--

INSERT INTO `ingredientes` (`idIngrediente`, `nombre`, `cantidadDisponible`, `unidadMedida`, `fecha_de_vencimiento`) VALUES
(1, 'Manzanas', 10, 'Unidad', '2024-07-21'),
(2, 'Harina', 20, 'tazas', '2024-08-09'),
(3, 'Azúcar', 15, 'tazas', '2024-07-21'),
(4, 'Huevos', 30, 'unidades', NULL),
(5, 'Naranja', 100, 'unidades', NULL),
(6, 'arroz', 10, 'kg.', NULL),
(7, 'huevo', 8, 'unidades', NULL),
(8, 'Limon', 20, 'unidades', NULL),
(9, 'Cebolla', 14, 'unidades', NULL),
(10, 'Pollo Entero', 4, 'unidades', NULL),
(11, 'Pollo parte pierna', 8, 'unidades', NULL),
(12, 'Pollo parte pecho', 4, 'unidades', NULL),
(13, 'Taza de agua', 8, 'lt.', NULL),
(14, 'Hojas de Bijao', 10, 'unidades', NULL),
(15, 'Cebolla', 6, 'kg.', NULL),
(16, 'Ajo entero', 10, 'unidades', NULL),
(17, 'Aceite Vegetal', 8, 'lt', NULL),
(18, 'Aceite Vegetal', 10, 'ml.', NULL),
(19, 'Plátano Verde', 8, 'unidades', NULL),
(20, 'Sal', 8, 'gr.', NULL),
(21, 'Doncella', 8, 'unidades', NULL),
(22, 'Jugo de limón ', 10, 'taza', NULL),
(23, 'Cilantro', 6, 'unidades', NULL),
(24, 'Choclo', 15, 'unidades', NULL),
(25, 'Camote', 13, 'unidades', NULL),
(26, 'Cebolla Roja', 15, 'unidades', NULL),
(27, 'Mariscos Mixtos', 14, 'kg.', NULL),
(28, 'Aji Molida', 15, 'Cucharadas', NULL),
(29, 'Camarones', 15, 'kg.', NULL),
(30, 'Zapallo', 14, 'tazas', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id_receta` int(11) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `fecha_pedido` date NOT NULL,
  `estado` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pedidos`
--

INSERT INTO `pedidos` (`id_pedido`, `id_receta`, `descripcion`, `fecha_pedido`, `estado`) VALUES
(6, 1, 'Profesora Jahaira, turno mañana', '2024-06-17', 'pendiente'),
(7, 2, 'Profesora Jahaira turno tarde', '2024-06-17', 'pendiente'),
(8, 1, 'Profesora Jahaira turno noche', '2024-06-17', 'pendiente'),
(9, 29, 'Profesor Ivan turno mañana', '2024-06-18', 'pendiente'),
(10, 31, 'Profesora jahaira turno mañana', '2024-06-17', 'hecho');

-- --------------------------------------------------------

--
-- Table structure for table `recetas`
--

CREATE TABLE `recetas` (
  `idReceta` int(11) NOT NULL,
  `idChef` int(11) DEFAULT NULL,
  `receta` varchar(50) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `estado` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `recetas`
--

INSERT INTO `recetas` (`idReceta`, `idChef`, `receta`, `descripcion`, `estado`) VALUES
(1, 1, 'Tarta de manzana', 'Una deliciosa tarta de manzana', 'Pendiente'),
(2, 2, 'Jugo de manzana', 'Un refrescante jugo de manzana', 'Pendiente'),
(29, NULL, 'Juane Regional', 'Plato Tópico de la Selva', ''),
(30, NULL, 'Chupe de Camarones', 'Plato típico de la Costa', ''),
(31, NULL, 'Juane', 'Plato Típico de la Selva', ''),
(32, NULL, 'pan con hot dog', 'plato de e.e.u.u', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tipo_user` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `tipo_user`) VALUES
(1, 'Samuel', '$2b$10$RJCHI6EmUAJSuV5pNZlxAe3BJFQIne1fnxYLinm2v3Hg1vHWq/mj6', '0'),
(2, 'Ray', '$2b$10$43lDW5FtDu6MffZMb/ypBua.6d4GlLcyfr00ugXFvijCRKI8VDfSC', ''),
(3, 'Pietro', '$2b$10$84VgRdejwyJg6lD09KRFNun7vZps7Zi4kuO2f68A7jJkzpBCOdG5e', ''),
(4, 'Gustavo', '$2b$10$1TD9NfksZ.tLJyeW.rWVO.W/FZYajGvwliadr9QBQbpEprp6chD0C', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `almacens`
--
ALTER TABLE `almacens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chefs`
--
ALTER TABLE `chefs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id_compra`);

--
-- Indexes for table `detallecompras`
--
ALTER TABLE `detallecompras`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detallepedidos`
--
ALTER TABLE `detallepedidos`
  ADD PRIMARY KEY (`id_detalle_pedido`);

--
-- Indexes for table `detallereceta`
--
ALTER TABLE `detallereceta`
  ADD PRIMARY KEY (`idDetalleReceta`),
  ADD KEY `idReceta` (`idReceta`),
  ADD KEY `idIngrediente` (`idIngrediente`);

--
-- Indexes for table `ingredientes`
--
ALTER TABLE `ingredientes`
  ADD PRIMARY KEY (`idIngrediente`);

--
-- Indexes for table `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`);

--
-- Indexes for table `recetas`
--
ALTER TABLE `recetas`
  ADD PRIMARY KEY (`idReceta`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `almacens`
--
ALTER TABLE `almacens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `chefs`
--
ALTER TABLE `chefs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `compras`
--
ALTER TABLE `compras`
  MODIFY `id_compra` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detallecompras`
--
ALTER TABLE `detallecompras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `detallepedidos`
--
ALTER TABLE `detallepedidos`
  MODIFY `id_detalle_pedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `detallereceta`
--
ALTER TABLE `detallereceta`
  MODIFY `idDetalleReceta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `ingredientes`
--
ALTER TABLE `ingredientes`
  MODIFY `idIngrediente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `recetas`
--
ALTER TABLE `recetas`
  MODIFY `idReceta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detallereceta`
--
ALTER TABLE `detallereceta`
  ADD CONSTRAINT `detallereceta_ibfk_1` FOREIGN KEY (`idReceta`) REFERENCES `recetas` (`idReceta`),
  ADD CONSTRAINT `detallereceta_ibfk_2` FOREIGN KEY (`idIngrediente`) REFERENCES `ingredientes` (`idIngrediente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
