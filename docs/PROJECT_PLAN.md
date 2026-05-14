# BioDockLab Project Plan

## 1. Project Summary

BioDockLab is a web-based educational platform for visualizing protein-ligand docking results. It combines public protein structure data, open-source docking tools, and interactive web visualization to make molecular docking easier to understand for students and non-specialists.

## 2. Problem Definition

Molecular docking is conceptually powerful but practically difficult for beginners. The workflow includes unfamiliar data formats, software installation, receptor and ligand preparation, docking execution, result interpretation, and 3D visualization. This creates a high entry barrier for interdisciplinary student teams.

## 3. Project Goal

The goal is to build a browser-based platform that allows users to explore a protein structure, compare ligand docking scores, and understand basic binding concepts through interactive visualization.

## 4. MVP Definition

The MVP will not attempt full-scale new drug discovery. It will focus on one protein target, a small ligand set, precomputed or controlled docking result data, and a web-based 3D visualization interface.

## 5. System Architecture

```txt
Public Data / Sample Files
        ↓
Data Preparation Scripts
        ↓
FastAPI Backend
        ↓
Docking Result JSON API
        ↓
Frontend + Molecular Viewer
        ↓
User Interaction / Educational Explanation
```

## 6. Deliverables

- GitHub repository
- Project plan document
- README
- Sample data folder
- Web-based prototype
- Experiment logs
- Final presentation material

## 7. Risk Management

| Risk | Impact | Response |
|---|---:|---|
| Docking workflow too difficult | High | Start with precomputed sample result data |
| Unity WebGL is too heavy | Medium | Use NGL Viewer or Mol* first |
| Biological interpretation overclaimed | High | Keep wording educational and exploratory |
| Team role confusion | Medium | Maintain role table and weekly meeting notes |
| Time shortage | High | Prioritize visualization MVP before AI expansion |

## 8. Success Criteria

- A user can open the web page and view a protein structure.
- A user can select ligand candidates and compare docking scores.
- The platform clearly states that results are educational and not clinical evidence.
- The repository contains enough documentation for another student to understand the project.
