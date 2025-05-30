async function getPosts() {
    // await new Promise((res) => setTimeout(res, 5000));
    try {
        const response = await fetch(`${process.env.API_HOST}/posts`);
        const data2 = await test.json();
        console.log(data2)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (e) {
        console.error(e.message);
    }
}
export { getPosts };



