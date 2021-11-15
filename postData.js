const postData = async (url, body, token) => {
    let data = null;
    let error = null;
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": "Token " + token },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            throw new Error("Something went wrong")
        }
        else {
            data = await res.json();
            error = null;

        }

    }
    catch (err) {
        error = err.message;
        console.log("Error in postData method: " + err)

    }
    return { data, error }
}

export default postData;