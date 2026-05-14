# BioDockLab Research Tool Direction

## Goal

BioDockLab aims to evolve from an educational visualization demo into a reproducible structure-based docking analysis tool.

## Research-Oriented Requirements

A research-oriented docking tool should manage:

- receptor structure files
- ligand structure files
- docking box configuration
- docking engine settings
- execution logs
- output poses
- score tables
- reproducibility metadata

## Planned Docking Pipeline

1. Select target protein from PDB ID
2. Prepare receptor structure
3. Prepare ligand structure
4. Define docking box
5. Run AutoDock Vina
6. Store score and output pose
7. Visualize result in browser

## Current Scope

The current implementation provides:

- PDB-based 3D visualization
- sample docking score display
- structured configuration files
- experiment metadata API

## Limitations

The current version does not yet execute real docking automatically.

Real docking execution requires:

- receptor preparation
- ligand preparation
- PDBQT conversion
- docking box validation
- AutoDock Vina installation
- output pose parsing
