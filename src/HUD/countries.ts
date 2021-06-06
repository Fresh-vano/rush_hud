export const countries: any = {
    'Belgorod_region' : 'Белгородская-область',
    'Bryansk_region' : 'Брянская-область',
	'Vladimir_region' : 'Владимирская-область',
	'Voronezh_region' : 'Воронежская-область',
	'Ivanovo_region' : 'Ивановская-область',
	'Kaluga_region' : 'Калужская-область',
	'Kostroma_region' : 'Костромская-область',
	'Kursk_region' : 'Курская-область',
	'Lipetsk_region' : 'Липецкая-область',
	'Moscow' : 'Москва',
	'Moscow_region' : 'Московская-область',
	'Orel_region' : 'Орловская-область',
	'Ryazan_region' : 'Рязанская-область',
	'Smolensk_region' : 'Смоленская-область',
	'Tambov_region' : 'Тамбовская-область',
	'Tver_region' : 'Тверская-область',
	'Tula_region' : 'Тульская-область',
	'Yaroslavl_region' : 'Ярославская-область',
	'Republic_of_Bashkortostan' : 'Республика-Башкортостан',
	'Kirov_region' : 'Кировская-область',
	'Republic_of_Mari_El' : 'Республика-Марий-Эл',
	'Republic_of_Mordovia' : 'Республика-Мордовия',
	'Nizhny_Novgorod_region' : 'Нижегородская-область',
	'Orenburg_oblast' : 'Оренбургская-область',
	'Penza_oblast' : 'Пензенская-область',
	'Perm_krai' : 'Пермский-край',
	'Samara_oblast' : 'Самарская-область',
	'Saratov_oblast' : 'Саратовская-область',
	'Republic_of_Tatarstan' : 'Республика-Татарстан',
	'Udmurt_Republic' : 'Удмуртская-республика',
	'Ulyanovsk_region' : 'Ульяновская-область',
	'Chuvash_Republic' : 'Чувашская-республика',
	'RU' : 'Россия'
};

export const getCountry = (iso: string) => {
    return countries[iso];
}
