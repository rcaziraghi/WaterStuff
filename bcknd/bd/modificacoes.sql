------------------------
--31/10/2020

ALTER TABLE `mydb`.`estado` 
DROP FOREIGN KEY `fk_estado_pais`;
ALTER TABLE `mydb`.`estado` 
CHANGE COLUMN `idEstado` `id` INT NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `pais_idPais` `idPais` INT NOT NULL ;
ALTER TABLE `mydb`.`estado` 
ADD CONSTRAINT `fk_estado_pais`
  FOREIGN KEY (`idPais`)
  REFERENCES `mydb`.`pais` (`idPais`);

--
--01/11/2020

UPDATE `mydb`.`estado` SET `estado` = 'Ceará' WHERE (`id` = '6');
UPDATE `mydb`.`estado` SET `estado` = 'Espírito Santo' WHERE (`id` = '7');
UPDATE `mydb`.`estado` SET `estado` = 'Amapá' WHERE (`id` = '3');
UPDATE `mydb`.`estado` SET `estado` = 'Goiás' WHERE (`id` = '8');
UPDATE `mydb`.`estado` SET `estado` = 'Maranhão' WHERE (`id` = '9');
UPDATE `mydb`.`estado` SET `estado` = 'Paraíba' WHERE (`id` = '14');
UPDATE `mydb`.`estado` SET `estado` = 'Pará' WHERE (`id` = '13');
UPDATE `mydb`.`estado` SET `estado` = 'Paraná' WHERE (`id` = '15');
UPDATE `mydb`.`estado` SET `estado` = 'Piauí' WHERE (`id` = '17');
UPDATE `mydb`.`estado` SET `estado` = 'São Paulo' WHERE (`id` = '24');

--05/11/2020
UPDATE `mydb`.`cargo` SET `nome` = 'USUARIO' WHERE (`id` = '1');
UPDATE `mydb`.`cargo` SET `nome` = 'MODERADOR' WHERE (`id` = '2');
UPDATE `mydb`.`cargo` SET `nome` = 'ADMIN' WHERE (`id` = '3');

--08/11/2020

ALTER TABLE `mydb`.`denuncia` 
ADD COLUMN `subtitulo` VARCHAR(45) NULL AFTER `titulo`,
CHANGE COLUMN `iddenuncia` `id` INT NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `nome` `titulo` VARCHAR(45) NOT NULL ,
CHANGE COLUMN `descritivo` `descritivo` VARCHAR(250) NOT NULL ,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`id`);
;

ALTER TABLE `mydb`.`denuncia` 
DROP FOREIGN KEY `fk_denuncia_usuario1`;
ALTER TABLE `mydb`.`denuncia` 
CHANGE COLUMN `usuario_id` `usuarioId` INT NOT NULL ;
ALTER TABLE `mydb`.`denuncia` 
ADD CONSTRAINT `fk_denuncia_usuario1`
  FOREIGN KEY (`usuarioId`)
  REFERENCES `mydb`.`usuario` (`id`);

ALTER TABLE `mydb`.`denuncia` 
ADD COLUMN `createdAt` DATETIME NOT NULL AFTER `usuarioId`,
ADD COLUMN `updatedAt` DATETIME NOT NULL AFTER `createdAt`;


