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