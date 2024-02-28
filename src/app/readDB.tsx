export default function readDB(table: string = ""): Promise<any> {
    return fetch("https://api.basic.tech/project/edc97cf5-9b0c-4d8f-b0ea-a988e1dcab6b/db/" + table, {
        headers: {
            "Authorization": "Bearer 134kxmsremsogepoqy8xoxf",
        },
        method: "GET",
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });
}