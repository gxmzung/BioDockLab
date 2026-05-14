# BioDockLab

> Web-based Protein-Ligand Docking Visualization Platform

BioDockLab is an educational and exploratory platform that visualizes protein-ligand docking workflows using public protein structure data and open-source bioinformatics tools.

This repository is designed as an interdisciplinary student project combining bioengineering, artificial intelligence, computer engineering, and game engineering.

---

## Why This Project Exists

Molecular docking is useful for understanding how a small molecule may bind to a protein target, but typical workflows are difficult for beginners because they involve domain-specific file formats, command-line tools, receptor preparation, ligand preparation, scoring interpretation, and 3D visualization.

BioDockLab does not aim to replace professional drug discovery tools. Instead, it lowers the entry barrier by turning docking results into an interactive web-based learning and exploration experience.

---

## Core Concept

Users can select a protein target, choose one or more ligands, and view predicted docking results through a browser-based 3D molecular viewer. Docking scores and binding poses are presented with clear visual feedback so that non-specialists can understand the process.

---

## Key Features

- Protein structure visualization in the browser
- Ligand and binding-pose result display
- Docking score comparison and ranking
- Educational explanations for each workflow step
- WebGL-based 3D interaction
- GitHub-based collaborative development workflow

---

## Tech Stack

### Backend
- Python
- FastAPI
- Pydantic

### Docking / Bioinformatics
- AutoDock Vina
- Open Babel
- RDKit
- DeepChem, optional expansion

### Frontend / Viewer
- HTML, CSS, JavaScript
- NGL Viewer or Mol*
- WebGL

### Collaboration / Deployment
- GitHub
- GitHub Issues
- Docker, optional
- Vercel or GitHub Pages, optional

---

## Project Structure

```txt
BioDockLab/
├── backend/        # FastAPI server and docking result API
├── frontend/       # Web UI
├── viewer/         # Molecular visualization logic
├── docs/           # Project plan, meeting notes, design documents
├── sample_data/    # Sample PDB, ligand, and docking result files
├── experiments/    # Experiment logs and analysis notes
├── assets/         # Images, diagrams, presentation assets
├── .github/        # Issue templates and collaboration rules
├── README.md
├── LICENSE
├── .gitignore
└── docker-compose.yml
```

---

## MVP Scope

The first MVP focuses on a realistic student-level implementation:

1. Select one public protein structure.
2. Prepare a small set of sample ligands.
3. Display precomputed or simplified docking result data.
4. Visualize the protein and binding region in a web viewer.
5. Show docking scores and rank ligands.
6. Explain the result as an educational reference, not a medical conclusion.

---

## Team Roles

| Area | Main Responsibility |
|---|---|
| Bioengineering / Chemical Engineering | Target protein selection, biological interpretation, result review |
| Artificial Intelligence | Docking score analysis, ranking logic, optional ML-based extension |
| Computer Engineering | Backend, data pipeline, API, repository architecture, integration |
| Game Engineering | 3D interaction, visual effects, educational UX, gamification |

---

## Development Roadmap

### Phase 0 - Repository Setup
- [x] Create GitHub repository
- [x] Create project structure
- [ ] Add README and documentation templates

### Phase 1 - Static Visualization MVP
- [ ] Load one protein structure in browser
- [ ] Show sample ligand information
- [ ] Display docking score table
- [ ] Add basic educational explanation panel

### Phase 2 - Backend Integration
- [ ] Build FastAPI endpoints
- [ ] Serve sample docking result JSON
- [ ] Connect frontend to backend

### Phase 3 - Docking Workflow Prototype
- [ ] Prepare receptor and ligand sample files
- [ ] Run AutoDock Vina locally or through scripted workflow
- [ ] Store outputs in experiments folder
- [ ] Convert results to viewer-friendly JSON

### Phase 4 - Presentation Polish
- [ ] Add architecture diagram
- [ ] Add demo scenario
- [ ] Add screenshots
- [ ] Prepare competition presentation material

---

## Honest Limits

BioDockLab is an educational and exploratory software project.

Docking scores are computational predictions and must not be interpreted as clinically validated medical evidence. Real-world drug discovery requires expert review, wet-lab validation, toxicity analysis, pharmacokinetic studies, and regulatory processes.

---

## Demo Scenario

1. Open the BioDockLab web page.
2. Select a protein target.
3. Select a ligand candidate.
4. View the protein structure in 3D.
5. Check docking score and ranking.
6. Read an educational explanation of the result.
7. Export or save the result summary.

---

## License

MIT License
