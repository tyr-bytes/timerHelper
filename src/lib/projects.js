function generateId() {
    return crypto.randomUUID();
}

export const projects = [
    {
        "id": generateId(),
        "project_code": "WEBR",
        "name": "Website Redesign",
        "description": "Overhaul the company's main website for better user experience",
        "timeSpent": 23,
        "intervals": [
            { "start": "2023-08-01T09:00:00", "end": "2023-08-01T12:30:00" },
            { "start": "2023-08-02T14:00:00", "end": "2023-08-02T17:00:00" },
            { "start": "2023-08-03T10:00:00", "end": "2023-08-03T14:00:00" }
        ]
    },
    {
        "id": generateId(),
        "project_code": "MAPP",
        "name": "Mobile App Development",
        "description": "Create a new iOS and Android app for customer engagement",
        "timeSpent": 81900,
        "intervals": [
            { "start": "2023-08-01T13:00:00", "end": "2023-08-01T18:00:00" },
            { "start": "2023-08-02T09:00:00", "end": "2023-08-02T17:45:00" },
            { "start": "2023-08-04T10:30:00", "end": "2023-08-04T16:30:00" }
        ]
    },
    {
        "id": generateId(),
        "project_code": "DBOP",
        "name": "Database Optimization",
        "description": "Improve database performance for faster query responses",
        "timeSpent": 29700,
        "intervals": [
            { "start": "2023-08-03T09:00:00", "end": "2023-08-03T13:15:00" },
            { "start": "2023-08-05T14:00:00", "end": "2023-08-05T18:00:00" }
        ]
    },
    {
        "id": generateId(),
        "project_code": "CLMT",
        "name": "Client Meeting Preparations",
        "description": "Prepare presentations and documents for upcoming client meetings",
        "timeSpent": 19800,
        "intervals": [
            { "start": "2023-08-02T09:30:00", "end": "2023-08-02T12:00:00" },
            { "start": "2023-08-04T15:00:00", "end": "2023-08-04T18:00:00" }
        ]
    },
    {
        "id": generateId(),
        "project_code": "TRNG",
        "name": "Employee Training Program",
        "description": "Develop and conduct training sessions for new software tools",
        "timeSpent": 39600,
        "intervals": [
            { "start": "2023-08-01T10:00:00", "end": "2023-08-01T16:00:00" },
            { "start": "2023-08-03T13:00:00", "end": "2023-08-03T18:00:00" }
        ]
    }
];