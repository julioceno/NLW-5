import { EntityRepository, Repository } from "typeorm";

import { Setting } from "../entities/Setting";

// Esse repositorio vai servir pra pegar a herança da classe Repository do typeorm, dentro dela tem varios metodos como save, create etc
@EntityRepository(Setting)
class SettingsRepository extends Repository<Setting> {};

export { SettingsRepository };