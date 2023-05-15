INSERT INTO partos (ano, mes, parto_normais, parto_cesaria, parto_total, municipio_id, predito)
SELECT
	p.ano, p.mes,
	sum(p.parto_normais) AS parto_normais,
	sum(p.parto_cesaria) AS parto_cesaria,
	sum(p.parto_total) AS parto_total,
	LEFT(p.municipio_id::varchar, 2)::integer AS municipio_id,
	false AS predito
FROM partos p
GROUP BY p.ano, p.mes, LEFT(p.municipio_id::varchar, 2)::integer
ORDER BY p.ano DESC, p.mes DESC
ON CONFLICT (municipio_id, ano, mes) DO UPDATE SET
	parto_normais = EXCLUDED.parto_normais,
	parto_cesaria = EXCLUDED.parto_cesaria,
	parto_total = EXCLUDED.parto_total,
	predito = EXCLUDED.predito;
