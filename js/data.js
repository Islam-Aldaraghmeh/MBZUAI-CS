//
// MBZUAI CS Department: Central Data Store
// This file acts as the single source of truth for all dynamic content.
//

const DB = {
    faculty: [
        { id: "xing_e", name: "Eric Xing", title: "President & University Professor", focus: "Machine Learning, NLP, Computational Biology", img_slug: "EX" },
        { id: "baldwin_t", name: "Timothy Baldwin", title: "Provost", focus: "Natural Language Processing, Web Science", img_slug: "TB" },
        { id: "takac_m", name: "Martin Takac", title: "Professor", focus: "Federated Learning, Optimization for ML", img_slug: "MT" },
        { id: "xue_j", name: "Chun Jason Xue", title: "Professor", focus: "Storage Systems, High-Performance Systems for AI", img_slug: "CX" },
        { id: "assent_i", name: "Ira Assent", title: "Professor", focus: "Data Mining, Large-Scale Data Analysis", img_slug: "IA" },
        { id: "anwer_r", name: "Rao Anwer", title: "Associate Professor", focus: "Computer Vision, Image Restoration, 3D Vision", img_slug: "RA" },
        { id: "yan_l", name: "Lingqi Yan", title: "Associate Professor", focus: "Computer Graphics, Photorealistic Rendering", img_slug: "LY" },
        { id: "mahmoud_a", name: "Abdulrahman Mahmoud", title: "Assistant Professor", focus: "Reliable AI Hardware, Systems for ML", img_slug: "AM" },
        { id: "bakita_j", name: "Joshua Bakita", title: "Assistant Professor", focus: "GPU Scheduling, Real-Time Operating Systems", img_slug: "JB" },
        { id: "basin_d", name: "David Basin", title: "Affiliated Professor", focus: "Information Security, Formal Methods", img_slug: "DB" },
        { id: "torr_p", name: "Philip Torr", title: "Affiliated Professor", focus: "Deep Learning, Computer Vision", img_slug: "PT" },
        { id: "scholkopf_b", name: "Bernhard Schölkopf", title: "Affiliated Professor", focus: "Causal Inference, Kernel Methods", img_slug: "BS" }
    ],
    researchAreas: [
        { id: "ml", name: "Machine Learning & AI", description: "Developing the core algorithms and theoretical foundations that power intelligent systems.", faculty: ["xing_e", "takac_m", "assent_i", "torr_p", "scholkopf_b"] },
        { id: "nlp", name: "Natural Language Processing", description: "Teaching machines to understand, interpret, and generate human language.", faculty: ["baldwin_t", "xing_e"] },
        { id: "cv", name: "Computer Vision", description: "Enabling machines to perceive, analyze, and reconstruct the visual world.", faculty: ["anwer_r", "torr_p", "yan_l"] },
        { id: "systems", name: "Computer Systems & Hardware", description: "Building the high-performance, reliable infrastructure that makes large-scale AI possible.", faculty: ["xue_j", "mahmoud_a", "bakita_j"] },
        { id: "graphics", name: "Computer Graphics", description: "Fusing physics and AI to create photorealistic visuals and immersive virtual worlds.", faculty: ["yan_l"] },
        { id: "security", name: "Information Security", description: "Developing provably secure systems to protect critical information in an AI-driven world.", faculty: ["basin_d"] }
    ],
    nexus: {
        nodes: [
            // Faculty
            { id: "xing_e", name: "E. Xing", type: 1 }, { id: "baldwin_t", name: "T. Baldwin", type: 1 }, { id: "takac_m", name: "M. Takac", type: 1 }, { id: "xue_j", name: "C. J. Xue", type: 1 }, { id: "assent_i", name: "I. Assent", type: 1 }, { id: "anwer_r", name: "R. Anwer", type: 1 }, { id: "yan_l", name: "L. Yan", type: 1 }, { id: "mahmoud_a", name: "A. Mahmoud", type: 1 }, { id: "bakita_j", name: "J. Bakita", type: 1 }, { id: "basin_d", name: "D. Basin", type: 1 }, { id: "torr_p", name: "P. Torr", type: 1 }, { id: "scholkopf_b", name: "B. Schölkopf", type: 1 },
            // Areas
            { id: "ML", name: "ML/AI", type: 2 }, { id: "NLP", name: "NLP", type: 2 }, { id: "CV", name: "Vision", type: 2 }, { id: "Systems", name: "Systems", type: 2 }, { id: "Graphics", name: "Graphics", type: 2 }, { id: "Security", name: "Security", type: 2 },
            // Concepts
            { id: "Optimization", name: "Optimization", type: 3 }, { id: "Causality", name: "Causality", type: 3 }, { id: "3D Vision", name: "3D Vision", type: 3 }, { id: "Rendering", name: "Rendering", type: 3 }, { id: "HPC", name: "HPC", type: 3 }, { id: "Formal Methods", name: "Formal Methods", type: 3 }, { id: "Deep Learning", name: "Deep Learning", type: 3 }
        ],
        links: [
            // Faculty to Areas
            { source: "xing_e", target: "ML" }, { source: "xing_e", target: "NLP" },
            { source: "baldwin_t", target: "NLP" },
            { source: "takac_m", target: "ML" }, { source: "takac_m", target: "Optimization" },
            { source: "xue_j", target: "Systems" }, { source: "xue_j", target: "HPC" },
            { source: "assent_i", target: "ML" },
            { source: "anwer_r", target: "CV" }, { source: "anwer_r", target: "3D Vision" },
            { source: "yan_l", target: "Graphics" }, { source: "yan_l", target: "Rendering" },
            { source: "mahmoud_a", target: "Systems" }, { source: "mahmoud_a", target: "HPC" },
            { source: "bakita_j", target: "Systems" },
            { source: "basin_d", "target": "Security" }, { source: "basin_d", target: "Formal Methods" },
            { source: "torr_p", target: "CV" }, { source: "torr_p", target: "Deep Learning" },
            { source: "scholkopf_b", target: "ML" }, { source: "scholkopf_b", target: "Causality" },
            // Interconnections
            { source: "ML", target: "Deep Learning" }, { source: "CV", target: "Deep Learning" },
            { source: "Rendering", target: "CV" }, { source: "Systems", target: "HPC" },
            { source: "Security", target: "Systems" }, { source: "Optimization", target: "Deep Learning" }
        ]
    },
    publications: [
        // Populate with real publication data later
        { id: 1, title: "Federated Optimization: A Key for Modern Machine Learning", faculty_ids: ["takac_m"], area: "ML" },
        { id: 2, title: "Causal Inference in the Age of Large Language Models", faculty_ids: ["scholkopf_b", "xing_e"], area: "ML" },
        { id: 3, title: "Neural Radiance Fields for Real-Time Photorealistic Rendering", faculty_ids: ["yan_l", "anwer_r"], area: "Graphics" },
    ]
};