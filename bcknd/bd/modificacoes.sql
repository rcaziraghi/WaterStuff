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
