interface ImageData {
    version: string;
    repo_name: string;
}

interface CommonResponse<T> {
    code: number;
    msg: string;
    data: T
}

// 更新容器
export async function updateContainer(deployImageData: ImageData): Promise<CommonResponse<any>> {
    return fetch(`http://192.168.48.128:80/ims/container/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(deployImageData)
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP 错误：${response.status}`)
        }
        return response.json()
    });
}