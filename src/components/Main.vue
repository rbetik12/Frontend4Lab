<template>
    <b-container class="bv-example-row">
        <b-row>
            <b-col>
                <graph :radius="Number(point.r)" ref="graph"></graph>
            </b-col>
            <b-col>
                <b-form @submit="onSubmit">
                    <b-form-group
                        id="input-group-1"
                        label="X:"
                        label-for="input-x"
                    >
                        <b-form-input
                            id="input-x"
                            v-model="point.x"
                            type="text"
                            required
                            placeholder="Enter x in range (-3, 5)"
                            :state="validateX"
                        ></b-form-input>

                        <b-form-invalid-feedback :state="validateX">
                            X must be a number in range (-3, 5).
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group
                        id="input-group-1"
                        label="Y:"
                        label-for="input-y"
                    >
                        <b-form-input
                            id="input-y"
                            v-model="point.y"
                            type="text"
                            required
                            placeholder="Enter y in range (-3, 3)"
                            :state="validateY"
                        ></b-form-input>
                        <b-form-invalid-feedback :state="validateY">
                            Y must be a number in range (-3, 3).
                        </b-form-invalid-feedback>
                    </b-form-group>


                    <b-form-group
                        id="input-group-1"
                        label="R:"
                        label-for="input-r"
                    >
                        <b-form-input
                            id="input-r"
                            v-model="point.r"
                            type="text"
                            required
                            placeholder="Enter y in range (0, 5)"
                            :state="validateR"
                        ></b-form-input>
                        <b-form-invalid-feedback :state="validateR">
                            R must be a number in range (0, 5).
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-button type="submit" variant="primary">Check</b-button>
                </b-form>
            </b-col>
        </b-row>
        <b-row>
            <Table></Table>
        </b-row>
    </b-container>
</template>

<script>
import Graph from "./Graph.vue";
import Table from "./Table.vue";

export default {
    name: "Main",
    components: {
        Graph, Table
    },
    data() {
        return {
            point: {
                x: null,
                y: null,
                r: 3,
            }
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault();
            const isHit = this.$refs.graph.fits(this.point.x, this.point.y, false);
            let x = 0;
            let y = 0;
            ({x, y} = this.$refs.graph.deformatPoint(this.point.x, this.point.y, this.point.r));
            this.$refs.graph.drawSinglePoint(x, y, isHit);
            this.$refs.graph.sendPoint(x, y);
        },
    },
    computed: {
        validateX() {
            return !isNaN(parseFloat(this.point.x))
                && isFinite(this.point.x)
                && this.point.x > -3
                && this.point.x < 5;
        },
        validateY() {
            return !isNaN(parseFloat(this.point.y))
                && isFinite(this.point.y)
                && this.point.y > -3
                && this.point.y < 3;
        },
        validateR() {
            return !isNaN(parseFloat(this.point.r))
                && isFinite(this.point.r)
                && this.point.r > 0
                && this.point.r < 5;
        }
    }
}
</script>

<style>

</style>
