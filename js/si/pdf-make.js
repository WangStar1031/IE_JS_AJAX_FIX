function generateSiTable() {
    var tbody = [[{text: 'Stage', style: 'tableHeader'}, {text: 'Action', style: 'tableHeader'}, {text: 'Start', style: 'tableHeader'}, {text: 'End', style: 'tableHeader'}, {text: 'Days', style: 'tableHeader'}]];
    var rowSpanIndex = -1;
    var rowSpanArray = [];
    $(".si-table tbody").find("tr").each(function(ind) {
        var rowArr = [];
        var self = this;
        if (!$(this).is(".four-month-warning-wrap") && (!$(this).is(".hidden-action") && $(this).css("display") != "none")) {
            $(self).find("td").each(function() {
                var obj = {};
                if ($(this).prop("rowspan") > 1) {

                    obj.rowSpan = $(this).prop("rowspan");
                    obj.style = "stageHeader";
                    if (rowSpanIndex == -1) {
                        rowSpanIndex = tbody.length;
                    } else {
                        var _rowSpan = tbody.length - rowSpanIndex;
                        //console.log(_rowSpan);
                        tbody[rowSpanIndex][0].rowSpan = _rowSpan;
                        rowSpanIndex = tbody.length;
                        rowSpanArray.push(rowSpanIndex);
                    }
                }
                if ($(this).find(".title").length > 0) {
                    obj.text = $(this).find(".title").textOnly();
                } else if ($(this).find("input").length > 0) {
                    obj.text = $(this).find("input").val();
                } else {
                    obj.text = $(this).textOnly();
                }
                rowArr.push(obj);
            });
            if (rowArr.length < 5) {
                rowArr.unshift("");
            }
            tbody.push(rowArr);
        }
        if ($(this).is(".four-month-warning-wrap")) {
            rowArr = [
                "",
                {
                    colSpan: 4,
                    table: {

                        body: [
                            ['You will not be able to lay a draft affirmative instrument, nor make a negative instrument, nor seek JCSI pre-scrutiny, unless you have PBL clearance. You should therefore start planning for seeking this clearance now. Further details on these requirements can be obtained from PBL Secretariat in the Cabinet Office.']
                        ]
                    }
                },
                "",
                "",
                ""
            ];
            tbody.push(rowArr);
        }

    }); 

    return {
        siTable: tbody,
        rowSpans: rowSpanArray
    }   
}

function generateDocDefinition() {
    var siTableRows = generateSiTable();
    var docDefinition = {
        "content": [
            {
                "alignment": "justify",
                "columns": [
                    [
                        {
                            "fontSize": 11,
                            "table": {
                                "headerRows": 1,
                                "body": [
                                    [
                                        {
                                            "text": "SI Timetable",
                                            "style": "bigHeader"
                                        }
                                    ],
                                    [
                                        "The SI timetable generated below gives indicative time required to complete your SI, based on best practice. It takes into account weekends, bank holidays and approximate Parliament recess dates. In most cases, you can add or remove days from the timetable."
                                    ]
                                ]
                            },
                            "layout": "headerLineOnly"
                        },
                        {
                            "table": {
                                "headerRows": 1,
                                "body": [
                                    [
                                        {
                                            "text": "Proposed Commencement Date",
                                            "style": "hiddenWhite"
                                        }
                                    ],
                                    [
                                        "Proposed Commencement"
                                    ],
                                    [
                                        "Date: " + $(".com-date").html()
                                    ]
                                ]
                            },
                            "layout": "headerLineOnly"
                        }
                    ],
                    {
                        "width": 350,
                        "fontSize": 11,
                        "table": {
                            "headerRows": 1,
                            "body": [
                                [
                                    {
                                        "text": "Please note",
                                        "style": "header"
                                    }
                                ],
                                [
                                    {
                                        "ul": [
                                            {
                                                "text": [
                                                    "At present",
                                                    {
                                                        "text": " we can't yet save",
                                                        "bold": true
                                                    },
                                                    " the SI timetable created below. We strongly advise you either print to paper or save a local pdf copy."
                                                ]
                                            },
                                            {
                                                "text": "Invisible text column",
                                                "listType": "none",
                                                "style": "hiddenWhite"
                                            },
                                            {
                                                "text": [
                                                    "Based on your answers and best practice, your SI project should start/have started on ",
                                                    {
                                                        "text": $("span.si-warning-date").html(),
                                                        "bold": true
                                                    },
                                                    ". It may still be possible to meet your proposed SI commencement date by manually deducting days from some of the stages below. Please make sure you do this in discussion with your drafting lawyer."
                                                ]
                                            },
                                            {
                                                "text": "Invisible text column",
                                                "listType": "none",
                                                "style": "hiddenWhite"
                                            },
                                            "Don't forget, that you'll also need to produce an explanatory memorandum, and a Parliamentary handling plan."
                                        ]
                                    }
                                ]
                            ]
                        },
                        "layout": "headerLineOnly"
                    }
                ]
            },
            {
                "style": "siTable",
                "fontSize": 11,
                "table": {
                    "widths": [
                        100,
                        "*",
                        55,
                        55,
                        30
                    ],
                    "body": siTableRows.siTable
                },
                "layout": {}
            }
        ],
        "styles": {
            "bigHeader": {
                "fontSize": 25,
                "bold": true
            },
            "header": {
                "fontSize": 16,
                "bold": true
            },
            "bigger": {
                "fontSize": 15,
                "italics": true
            },
            "hiddenWhite": {
                "color": "#ffffff"
            },
            "tableHeader": {
                "bold": true,
                "fontSize": 13,
                "color": "black",
                "alignment": "center"
            },
            "siTable": {
                "margin": [
                    0,
                    100,
                    0,
                    0
                ]
            },
            "stageHeader": {
                "fontSize": 15,
                "bold": true,
                "alignment": "center"
            }
        },
        "defaultStyle": {
            "columnGap": 20
        }
};

    return docDefinition;
    
    var docDefinition = {
        "content": [
            {
                "alignment": "justify",
                "columns": [
                    [
                        {
                            "fontSize": 11,
                            "table": {
                                "headerRows": 1,
                                "body": [
                                    [
                                        {
                                            "text": "SI Timetable",
                                            "style": "bigHeader"
                                        }
                                    ],
                                    [
                                        "The SI timetable generated below gives indicative time required to complete your SI, based on best practice. It takes into account weekends, bank holidays and approximate Parliament recess dates. In most cases, you can add or remove days from the timetable."
                                    ]
                                ]
                            },
                            "layout": "headerLineOnly"
                        },
                        {
                            "table": {
                                "headerRows": 1,
                                "body": [
                                    [
                                        {
                                            "text": "Proposed Commencement Date",
                                            "style": "hiddenWhite"
                                        }
                                    ],
                                    [
                                        "Proposed Commencement"
                                    ],
                                    [
                                        'Date: ' + $("span.com-date").html()
                                    ]
                                ]
                            },
                            "layout": "headerLineOnly"
                        }
                    ],
                    {
                        "width": 350,
                        "fontSize": 11,
                        "table": {
                            "headerRows": 1,
                            "body": [
                                [
                                    {
                                        "text": "Please note",
                                        "style": "header"
                                    }
                                ],
                                [
                                    {
                                        "ul": [
                                            {
                                                "text": [
                                                    "At present",
                                                    {
                                                        "text": " we can't yet save",
                                                        "bold": true
                                                    },
                                                    " the SI timetable created below. We strongly advise you either print to paper or save a local pdf copy."
                                                ]
                                            },
                                            {
                                                "text": "Invisible text column",
                                                "listType": "none",
                                                "style": "hiddenWhite"
                                            },
                                            {
                                                "text": [
                                                    "Based on your answers and best practice, your SI project should start/have started on ",
                                                    {
                                                        "text": $("span.si-warning-date").html(),
                                                        "bold": true
                                                    },
                                                    ". It may still be possible to meet your proposed SI commencement date by manually deducting days from some of the stages below. Please make sure you do this in discussion with your drafting lawyer."
                                                ]
                                            },
                                            {
                                                "text": "Invisible text column",
                                                "listType": "none",
                                                "style": "hiddenWhite"
                                            },
                                            "Don't forget, that you'll also need to produce an explanatory memorandum, and a Parliamentary handling plan."
                                        ]
                                    }
                                ]
                            ]
                        },
                        "layout": "headerLineOnly"
                    }
                ]
            },
            {
                "style": "siTable",
                "fontSize": 11,
                "table": {
                    "widths": [
                        100,
                        "*",
                        55,
                        55,
                        30
                    ],
                    "body": [
                        [{
                            "text": "Stage",
                            "style": "tableHeader"
                        },
                        {
                            "text": "Action",
                            "style": "tableHeader"
                        },
                        {
                            "text": "Start",
                            "style": "tableHeader"
                        },
                        {
                            "text": "End",
                            "style": "tableHeader"
                        },
                        {
                            "text": "Days",
                            "style": "tableHeader"
                        }],
                        [
                            {
                                "rowSpan": 3,
                                "style": "stageHeader",
                                "text": "Policy Instructions"
                            },
                            {
                                "text": "Policy official develops and consults on policy proposals"
                            },
                            {
                                "text": "7-Oct-16"
                            },
                            {
                                "text": "20-Oct-16"
                            },
                            {
                                "text": "10"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Policy official and lawyer discuss initial requirements"
                            },
                            {
                                "text": "21-Oct-16"
                            },
                            {
                                "text": "3-Nov-16"
                            },
                            {
                                "text": "10"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Policy official prepares instructions to lawyer"
                            },
                            {
                                "text": "4-Nov-16"
                            },
                            {
                                "text": "10-Nov-16"
                            },
                            {
                                "text": "5"
                            }
                        ],
                        [
                            {
                                "rowSpan": 4,
                                "style": "stageHeader",
                                "text": "Drafting"
                            },
                            {
                                "text": "Lawyer prepares first draft of SI"
                            },
                            {
                                "text": "11-Nov-16"
                            },
                            {
                                "text": "15-Nov-16"
                            },
                            {
                                "text": "2.5"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Lawyer produces revised draft of SI"
                            },
                            {
                                "text": "16-Nov-16"
                            },
                            {
                                "text": "20-Nov-16"
                            },
                            {
                                "text": "2.5"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Policy official consults informally with stakeholders and other departments"
                            },
                            {
                                "text": "21-Nov-16"
                            },
                            {
                                "text": "4-Dec-16"
                            },
                            {
                                "text": "10"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Lawyer checks and revises accompanying documents"
                            },
                            {
                                "text": "5-Dec-16"
                            },
                            {
                                "text": "18-Dec-16"
                            },
                            {
                                "text": "10"
                            }
                        ],
                        [
                            {
                                "rowSpan": 6,
                                "style": "stageHeader",
                                "text": "Pre-consultation approval"
                            },
                            {
                                "text": "Second lawyer checks draft SI"
                            },
                            {
                                "text": "19-Dec-16"
                            },
                            {
                                "text": "4-Jan-17"
                            },
                            {
                                "text": "10"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Lawyer seeks Parliamentary Counsel clearance"
                            },
                            {
                                "text": "5-Jan-17"
                            },
                            {
                                "text": "1-Feb-17"
                            },
                            {
                                "text": "20"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Third lawyer checks draft SI"
                            },
                            {
                                "text": "2-Feb-17"
                            },
                            {
                                "text": "15-Feb-17"
                            },
                            {
                                "text": "10"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Lawyer and policy official check and proofread SI"
                            },
                            {
                                "text": "16-Feb-17"
                            },
                            {
                                "text": "20-Feb-17"
                            },
                            {
                                "text": "2.5"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Policy official seeks ministerial approval to start consultation"
                            },
                            {
                                "text": "21-Feb-17"
                            },
                            {
                                "text": "27-Feb-17"
                            },
                            {
                                "text": "5"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Better Regulation"
                            },
                            {
                                "text": "28-Feb-17"
                            },
                            {
                                "text": "10-Apr-17"
                            },
                            {
                                "text": "30"
                            }
                        ],
                        [
                            {
                                "rowSpan": 2,
                                "style": "stageHeader",
                                "text": "Consultation on draft statutory instrument"
                            },
                            {
                                "text": "Policy official initiates and runs consultation exercise"
                            },
                            {
                                "text": "11-Apr-17"
                            },
                            {
                                "text": "26-Apr-17"
                            },
                            {
                                "text": "10"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Policy official analyses consultation responses and provides revised instructions to drafting lawyer"
                            },
                            {
                                "text": "27-Apr-17"
                            },
                            {
                                "text": "11-May-17"
                            },
                            {
                                "text": "10"
                            }
                        ],
                        [
                            {
                                "rowSpan": 2,
                                "style": "stageHeader",
                                "text": "Post-consultation amendments"
                            },
                            {
                                "text": "Lawyer produces revised draft of SI"
                            },
                            {
                                "text": "12-May-17"
                            },
                            {
                                "text": "16-May-17"
                            },
                            {
                                "text": "2.5"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Policy official consults informally with stakeholders and other departments"
                            },
                            {
                                "text": "17-May-17"
                            },
                            {
                                "text": "31-May-17"
                            },
                            {
                                "text": "10"
                            }
                        ],
                        [
                            {
                                "rowSpan": 14,
                                "style": "stageHeader",
                                "text": "Final approval and clearances"
                            },
                            {
                                "text": "Second lawyer checks draft SI"
                            },
                            {
                                "text": "1-Jun-17"
                            },
                            {
                                "text": "14-Jun-17"
                            },
                            {
                                "text": "10"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Lawyer seeks Parliamentary Counsel clearance"
                            },
                            {
                                "text": "15-Jun-17"
                            },
                            {
                                "text": "12-Jul-17"
                            },
                            {
                                "text": "20"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Third lawyer checks draft SI"
                            },
                            {
                                "text": "13-Jul-17"
                            },
                            {
                                "text": "26-Jul-17"
                            },
                            {
                                "text": "10"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Lawyer and policy official check and proofread SI"
                            },
                            {
                                "text": "27-Jul-17"
                            },
                            {
                                "text": "31-Jul-17"
                            },
                            {
                                "text": "2.5"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Policy official manages ministerial write-round seeking final Cabinet clearances"
                            },
                            {
                                "text": "1-Aug-17"
                            },
                            {
                                "text": "7-Aug-17"
                            },
                            {
                                "text": "5"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Policy official seeks ministerial approval to make SI"
                            },
                            {
                                "text": "8-Aug-17"
                            },
                            {
                                "text": "14-Aug-17"
                            },
                            {
                                "text": "5"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Other Approvals"
                            },
                            {
                                "text": "15-Aug-17"
                            },
                            {
                                "text": "7-Nov-17"
                            },
                            {
                                "text": "60"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Better Regulation"
                            },
                            {
                                "text": "8-Nov-17"
                            },
                            {
                                "text": "19-Dec-17"
                            },
                            {
                                "text": "30"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Policy official leads on technical standards notification to European Commission"
                            },
                            {
                                "text": "20-Dec-17"
                            },
                            {
                                "text": "28-Dec-17"
                            },
                            {
                                "text": "5"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Technical standards standstill period"
                            },
                            {
                                "text": "29-Dec-17"
                            },
                            {
                                "text": "4-Apr-18"
                            },
                            {
                                "text": "66"
                            }
                        ],
                        [
                            "",
                            {
                                "colSpan": 4,
                                "table": {
                                    "body": [
                                        [
                                            "You will not be able to lay a draft affirmative instrument, nor make a negative instrument, nor seek JCSI pre-scrutiny, unless you have PBL clearance. You should therefore start planning for seeking this clearance now. Further details on these requirements can be obtained from PBL Secretariat in the Cabinet Office."
                                        ]
                                    ]
                                }
                            },
                            "",
                            "",
                            ""
                        ],
                        [
                            "",
                            {
                                "text": "Lawyer arranges SI validation"
                            },
                            {
                                "text": "5-Apr-18"
                            },
                            {
                                "text": "8-Apr-18"
                            },
                            {
                                "text": "2"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Lawyer liaises with JCSI's lawyer to seek informal clearance on affirmative instrument"
                            },
                            {
                                "text": "9-Apr-18"
                            },
                            {
                                "text": "22-Apr-18"
                            },
                            {
                                "text": "10"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Lawyer deals with any JCSI queries in consultation with the client"
                            },
                            {
                                "text": "23-Apr-18"
                            },
                            {
                                "text": "7-May-18"
                            },
                            {
                                "text": "10"
                            }
                        ],
                        [
                            {
                                "rowSpan": 5,
                                "style": "stageHeader",
                                "text": "Parliamentary process for affirmative SIs "
                            },
                            {
                                "text": "Policy official 'puts up' a submission to the minister, seeking approval to lay draft SI in Parliament"
                            },
                            {
                                "text": "8-May-18"
                            },
                            {
                                "text": "14-May-18"
                            },
                            {
                                "text": "5"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Parliamentary branch initiates SI registration, publication and printing"
                            },
                            {
                                "text": "15-May-18"
                            },
                            {
                                "text": "21-May-18"
                            },
                            {
                                "text": "5"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Lawyer initiates laying of draft SI in readiness for JCSI meeting and parliamentary debate"
                            },
                            {
                                "text": "22-May-18"
                            },
                            {
                                "text": "3-Jul-18"
                            },
                            {
                                "text": "30"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Minister signs SI"
                            },
                            {
                                "text": "4-Jul-18"
                            },
                            {
                                "text": "10-Jul-18"
                            },
                            {
                                "text": "5"
                            }
                        ],
                        [
                            "",
                            {
                                "text": "Post Signature Period"
                            },
                            {
                                "text": "11-Jul-18"
                            },
                            {
                                "text": "31-Jul-18"
                            },
                            {
                                "text": "21"
                            }
                        ]
                    ]
                },
                "layout": {}
            }
        ],
        "styles": {
            "bigHeader": {
                "fontSize": 25,
                "bold": true
            },
            "header": {
                "fontSize": 16,
                "bold": true
            },
            "bigger": {
                "fontSize": 15,
                "italics": true
            },
            "hiddenWhite": {
                "color": "#ffffff"
            },
            "tableHeader": {
                "bold": true,
                "fontSize": 13,
                "color": "black",
                "alignment": "center"
            },
            "siTable": {
                "margin": [
                    0,
                    100,
                    0,
                    0
                ]
            },
            "stageHeader": {
                "fontSize": 15,
                "bold": true,
                "alignment": "center"
            }
        },
        "defaultStyle": {
            "columnGap": 20
        }
};
    return docDefinition;
}

//tbody.length
//JSON.stringify(tbody, null, 4)