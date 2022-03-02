-- exécutez ce script dans votre base, et la vue sera prête

CREATE VIEW variety_with_full_name AS
SELECT
  species.scientific_name || ' ' || variety.cultivar AS cultivar,
  variety.bitterness,
  variety.juiciness,
  variety.species_id,
  -- puisqu'on fait une jointure, j'en profite pour tout récupérer
  species.scientific_name,
  species.common_name,
  species.family
FROM variety
JOIN species ON variety.species_id = species.id;