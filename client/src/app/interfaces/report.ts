interface Comment {
    _id: string,
    description: string,
    createdBy: string,
    timestamp: Date,
}

export interface Report {
    _id: string,
    title: string,
    description: string,
    date: Date,
    status: string,
    createdBy: string,
    username: string,
    comments: Comment[],
}
