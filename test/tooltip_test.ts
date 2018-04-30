import { assert } from "chai";
import * as QP from "../src/index";
import * as helper from "./helper";
import { plan } from "./plans";
import * as tooltip from "../src/tooltip";

describe("tooltip moduele", () => {

    describe("buildLineTooltip", () => {

        it("Includes Actual Number of Rows", () => {

            let container = helper.showPlan(plan.adaptive_join);
            let line = helper.findLineById(container, "4");
            let tt = tooltip.buildLineTooltip(line);
            let row = tt.querySelector("tbody").children[0];
            assert.equal("Actual Number of Rows", row.querySelector("th").innerText);
            assert.equal("0", row.querySelector("td").innerText);

        });

        it("Doesn't include Actual Number of Rows for estimated plans", () => {

            let container = helper.showPlan(plan.adaptive_join_estimated);
            let line = helper.findLineById(container, "4");
            let tt = tooltip.buildLineTooltip(line);
            let row = tt.querySelector("tbody").children[0];
            assert.equal("Estimated Number of Rows", row.querySelector("th").innerText);

        });

        it("Shows number of rows read", () => {

            let container = helper.showPlan(plan.adaptive_join);
            let line = helper.findLineById(container, "7");
            let tt = tooltip.buildLineTooltip(line);
            let row = tt.querySelector("tbody").children[1];
            assert.equal("Number of Rows Read", row.querySelector("th").innerText);
            assert.equal("10", row.querySelector("td").innerText);

        });

        it("Includes Estimated Number of Rows", () => {

            let container = helper.showPlan(plan.adaptive_join);
            let line = helper.findLineById(container, "4");
            let tt = tooltip.buildLineTooltip(line);
            let row = tt.querySelector("tbody").children[1];
            assert.equal("Estimated Number of Rows", row.querySelector("th").innerText);
            assert.equal("100000", row.querySelector("td").innerText);

        });

        it("Includes Estimated Row Size", () => {

            let container = helper.showPlan(plan.adaptive_join);
            let line = helper.findLineById(container, "4");
            let tt = tooltip.buildLineTooltip(line);
            let row = tt.querySelector("tbody").children[2];
            assert.equal("Estimated Row Size", row.querySelector("th").innerText);
            assert.equal("11 B", row.querySelector("td").innerText);

        });

        it("Includes Estimated Data Size", () => {

            let container = helper.showPlan(plan.adaptive_join);
            let line = helper.findLineById(container, "4");
            let tt = tooltip.buildLineTooltip(line);
            let row = tt.querySelector("tbody").children[3];
            assert.equal("Estimated Data Size", row.querySelector("th").innerText);
            assert.equal("1074 KB", row.querySelector("td").innerText);

        });

    });

    describe("convertSize", () => {

        it("Sizes >= 10 KB in KB", () => {

             assert.equal(tooltip.convertSize(5000), '5000 B');
             assert.equal(tooltip.convertSize(10240), '10 KB');

        });

        it("Converts sizes 10 MB & > into MB", () => {

            assert.equal(tooltip.convertSize(10230000), '9990 KB');
            assert.equal(tooltip.convertSize(10240000), '10 MB');

        });

    });

});