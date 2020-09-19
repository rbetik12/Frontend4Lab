<template>
    <b-container>
        <b-button variant="primary" v-on:click="showYourPoints = !showYourPoints; fetchTable()">
            {{
            showYourPoints ? thisUserTable : allUsersTable
            }}
        </b-button>
        <b-table striped hover :items="points" class="mt-3"></b-table>
    </b-container>
</template>

<script>
export default {
    name: "Table",
    data() {
        return {
            points: [],
            address: "localhost:8090",
            thisUserTable: "Your points",
            allUsersTable: "Everyone points",
            showYourPoints: true
        }
    },
    methods: {
        fetchTable() {
            const requestOptions = {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                method: 'GET',
                credentials: 'include'
            }
            fetch(`http://${this.address}/backend/api/point/${this.showYourPoints ? "getUserPoints" : "getAllUsersPoints"}`, requestOptions)
                .then(res => {
                    res.text().then(text => {
                        const fetchedPoints = JSON.parse(text);
                        this.points = [];
                        for (let fetchedPoint of fetchedPoints) {
                            let x = 0;
                            let y = 0;
                            ({x, y} = this.formatPoints(fetchedPoint.x, fetchedPoint.y, fetchedPoint.r));
                            let point = {
                                x: x,
                                y: y,
                                r: fetchedPoint.r,
                                user: fetchedPoint.user.username,
                                result: fetchedPoint.hit
                            }
                            this.points.push(point);
                        }
                    })
                });
        },
        formatPoints(x, y, r) {
            return {x: r * (x - 150) / 130, y: r * (150 - y) / 130}
        }
    },
    mounted() {
      this.fetchTable();
    }
}
</script>

<style scoped>

</style>
