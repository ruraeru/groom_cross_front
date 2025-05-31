async function getPosts() {
    // await new Promise((res) => setTimeout(res, 5000));
    try {
        const response = await fetch(`${process.env.REACT_APP_API_HOST}/posts`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (e) {
        console.error(e.message);
    }
}
export { getPosts };