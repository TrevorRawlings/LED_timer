function CheckQuote(obj) {
            var x = parseInt($.trim($("#circuit-x").val()));
            var y = parseInt($.trim($("#circuit-y").val()));
            var num = parseInt($.trim($("#num").val()));
            var Thickness = parseFloat($("#Thicknessquote").val());
            var layers = $("#Layersquote").val();


            if (!y || y == 0 || y > 1200) {
                alert('Please input length.');
                $("#circuit-y").focus();
                return false;
            }
            if (!x || x == 0 || x > 1200) {
                alert('Please input width.');
                $("#circuit-x").focus();
                return false;
            }

            if (!num || num == 0) {
                alert('Please Input Quantity.');
                $("#num").focus();
                return false;
            }

            if (isNaN(layers) || layers == 0) {

                alert('Please choose layers value.');
                $("#Layersquote").focus();
                return false;
            }
            if (isNaN(Thickness) || Thickness == 0) {

                alert('Please choose Thickness value.');
                $("#Thicknessquote").focus();
                return false;
            }



            return true;
        }




        $(document).ready(function() {

            $("#Layersquote").change(function() {
                var lvar = $(this).val();
                if (lvar == "4") {
                    var lllVal = $("#Thicknessquote").val();
                    if (lllVal == "0.4" || lllVal == "2.4") {
                        //alert("Sorry, 0.4mm and 2.4mm board thickness are not available for 4 layer PCB. ");
                        $("#Thicknessquote").val("");

                    }

                }

                if (lvar == "6") {
                    var llllVal = $("#Thicknessquote").val();
                    if (llllVal == "0.4" || llllVal == "0.6" || llllVal == "2.4") {
                        //alert("Sorry, 0.4mm, 0.6mm and 2.4mm board thickness are not available for 6 layer PCB.");
                        $("#Thicknessquote").val("");

                    }

                }
            });

            $("#Thicknessquote").change(function() {
                var selVal = $(this).val();

                if (selVal == "0.4" || selVal == "0.6" || selVal == "0.8" || selVal == "2.4") {

                    $("#CopperWeight").val("1");
                }

                var llVal = $("#Layersquote").val();
                if (llVal == "4") {
                    if (selVal == "0.4" || selVal == "2.4") {
                        //alert("Sorry, 0.4mm and 2.4mm board thickness are not available for 4 layer PCB. ");
                        $("#Layersquote").val("");
                    }
                }
                if (llVal == "6") {
                    if (selVal == "0.4" || selVal == "0.6" || selVal == "2.4") {
                        //alert("Sorry, 0.4mm, 0.6mm and 2.4mm board thickness are not available for 6 layer PCB.");
                        $("#Layersquote").val("");
                    }
                }
            });

            $("#CopperWeight").change(function() {
                var selVal = $(this).val();
                var bVal = $("#Thickness").val();
                if (selVal == "2" && (bVal == "0.4" || bVal == "0.6" || bVal == "0.8" || bVal == "2.4")) {
                    //alert("Sorry, 0.4mm, 0.6mm, 0.8mm and 2.4mm board thickness are not available for PCB boards with 2oz copper weight. ");
                    $("#Thickness").val("");

                }

            });
        });
        