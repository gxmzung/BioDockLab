# MVP Specification

## MVP Name

BioDockLab v0.1 - Static Docking Result Viewer

## Objective

Build a web-based prototype that visualizes a protein structure and displays sample ligand docking scores.

## Included

- Protein structure viewer
- Ligand list
- Docking score table
- Result explanation panel
- Basic responsive web UI
- Sample JSON data

## Excluded

- Full-scale drug discovery
- Clinical prediction
- Real-time cloud docking at scale
- Wet-lab validation
- User authentication
- Payment or commercial workflow

## User Flow

1. User opens web page.
2. User selects a protein target.
3. User selects a ligand candidate.
4. Viewer highlights the binding region.
5. Score panel displays the result.
6. User reads the educational explanation.

## API Draft

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Backend health check |
| GET | `/proteins` | List sample proteins |
| GET | `/ligands` | List sample ligands |
| GET | `/results` | Return docking result data |

## Sample Result Format

```json
{
  "protein_id": "sample_protein",
  "ligands": [
    {
      "ligand_id": "ligand_001",
      "name": "Sample Ligand 1",
      "docking_score": -7.4,
      "unit": "kcal/mol",
      "rank": 1,
      "note": "Lower score generally indicates stronger predicted binding."
    }
  ]
}
```
