document.addEventListener("DOMContentLoaded", function () {

    const serialInput = document.getElementById("serialNumber");
    const warrantyButton = document.querySelector(".warranty-box .btn");

    if (serialInput && warrantyButton) {

        warrantyButton.addEventListener("click", function () {

            const serial = serialInput.value.trim();

            // اگر شماره سریال وارد نشده باشد
            if (serial === "") {
                showWarrantyResult(
                    "لطفاً شماره سریال محصول را وارد کنید.",
                    "error"
                );
                return;
            }

            /*
             * اطلاعات آزمایشی
             * بعداً این قسمت به دیتابیس واقعی متصل می‌شود.
             */

            const demoSerials = {
                "AT10001": {
                    status: "معتبر",
                    product: "محصول نمونه",
                    date: "1406/06/30"
                },

                "AT10002": {
                    status: "منقضی شده",
                    product: "محصول نمونه",
                    date: "1405/03/15"
                }
            };

            if (demoSerials[serial]) {

                const data = demoSerials[serial];

                showWarrantyResult(
                    `
                    <strong>نتیجه استعلام</strong>
                    <br><br>
                    وضعیت گارانتی:
                    <b>${data.status}</b>
                    <br>
                    محصول:
                    ${data.product}
                    <br>
                    تاریخ پایان گارانتی:
                    ${data.date}
                    `,
                    "success"
                );

            } else {

                showWarrantyResult(
                    `
                    شماره سریال
                    <strong>${serial}</strong>
                    در سامانه آزمایشی پیدا نشد.
                    <br><br>
                    لطفاً شماره سریال را بررسی کنید.
                    `,
                    "error"
                );

            }

        });

    }


    function showWarrantyResult(message, type) {

        let result = document.getElementById("warrantyResult");

        if (!result) {

            result = document.createElement("div");

            result.id = "warrantyResult";

            const warrantyBox =
                document.querySelector(".warranty-box");

            warrantyBox.parentNode.insertBefore(
                result,
                warrantyBox.nextSibling
            );
        }

        result.className = "warranty-result " + type;

        result.innerHTML = message;

        result.style.display = "block";
    }

});
