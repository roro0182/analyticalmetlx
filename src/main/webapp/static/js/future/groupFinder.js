function setIfMissing(coll,key,val){
    if(!(key in coll)){
        coll[key] = val;
    }
}
function prerenderGroupCanvas(group){
    group.identity = group.items[0].identity;
    group.bounds = _.reduce(group.items,function(acc,item){
        return mergeBounds(acc,item.bounds);
    },group.items[0].bounds);
    group.color = group.items[0].color;
    var canvas = $("<canvas />");
    canvas.attr("width",px(group.bounds.width));
    canvas.attr("height",px(group.bounds.height));
    group.canvas = canvas[0];
    var context = group.canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0,0,group.bounds.width,group.bounds.height);
    $.each(group.items,function(i,item){
        context.drawImage(item.canvas,
                          item.bounds[0] - group.bounds.minX,
                          item.bounds[1] - group.bounds.minY);
    });
    return canvas;
}
function showOffscreenElements(elements){
    var radar = $("#radar");
    radar.empty();
    var clumps = {};
    var width = boardWidth / 2;
    var height = boardHeight / 2;
    var deviation = Math.max(boardWidth,boardHeight) * 2;
    $.each(elements,function(i,element){
        var b = element.bounds;
        var originX = viewboxX + (viewboxWidth / 2) + contentOffsetX;
        var originY = viewboxY + (viewboxHeight / 2) + contentOffsetY;
        var deltaX = b.centerX - originX;
        var deltaY = originY - b.centerY;
        var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        var angle = Math.atan2(deltaY,deltaX) + (Math.PI / 2);
        var arc = angle.toFixed(1);
        var band = (distance / deviation).toFixed(0);
        setIfMissing(clumps,arc,{});
        setIfMissing(clumps[arc],band,[]);
        clumps[arc][band].push(element);
    });
    var maxDistance = -Infinity;
    var minRadius = 20;
    var maxRadius = 70;
    var variance = 0.3;
    $.each(clumps,function(arc,bands){
        $.each(bands,function(band,es){
            maxDistance = Math.max(maxDistance,Math.abs(band));
        });
    });
    $.each(clumps,function(arc,bands){
        $.each(bands,function(band,es){
            var element = es[0];
            var ratio = (Math.abs(band) / maxDistance * variance);
            var factor = 1 - ratio;
            var markerX = width + (width * factor * Math.sin(arc));
            var markerY = height + (height * factor * Math.cos(arc));
            var radius = Math.min(minRadius + es.length * 10,maxRadius);
            var sumX = 0;
            var sumY = 0;
            var divisor = es.length * 2;
            $.each(es,function(i,e){
                sumX += e.bounds[0];
                sumX += e.bounds[2];
                sumY += e.bounds[1];
                sumY += e.bounds[3];
            });
            var canvas = Canvas.circle("black",radius).css({
                position:"absolute",
                left:px(markerX),
                top:px(markerY)
            }).click(function(){
                Extend.center(sumX / divisor,sumY / divisor,function(){
                    $("#selectionAdorner").empty();
                    es.map(drawSelectionBounds).map(function(e){
                        e.fadeOut(1500);
                    });
                });
            }).css({
                opacity:0.3
            }).appendTo(radar);
            /*
             var context = canvas[0].getContext("2d");
             context.strokeStyle = "white";
             context.strokeText(es.length.toString(),radius / 2 - 5,10,50);
             */
        });
    });
}
function precacheOffscreenElement(element){
    var b = element.bounds;
    element.offscreenElement = Canvas.circle(element.color[0],20).click(function(){
        Extend.center(b.centerX - viewboxWidth / 2,b.centerY - viewboxHeight / 2);
    }).appendTo("#radar");
}
//Autogenerated table of contents like a google doc represents available tags and where they are
var GroupFinder = (function(){
    var popupId = "test";
    var createContentGroups = function(){
        var inks = _.sortBy(_.values(boardContent.inks),function(i){
            return i.timestamp;
        });
        var contentGroups = [];
        var interval = 15000;//milis
        var group = {
            items:[]
        };
        var t = 0;
        $.each(inks,function(i,ink){
            if(ink.timestamp - t < interval){
                group.items.push(ink);
            }
            else{
                contentGroups.push(group);
                group = {
                    items:[ink]
                };
            }
            t = ink.timestamp;
        });
        contentGroups.push(group);
        contentGroups = _.filter(contentGroups,function(g){
            return g.items.length > 0;
        });
        $.each(contentGroups,function(groupIndex,group){
            prerenderGroupCanvas(group);
        });
        return contentGroups;
    }
    Progress.historyReceived["autoCreateContentGroups"] = function(){
        $("#radar").empty();
        boardContent.contentGroups = createContentGroups(boardContent);
    }
    String.prototype.hashCode = function(){
        var hash = 0;
        var char;
        if (this.length == 0) return hash;
        for (var i = 0; i < this.length; i++) {
            char = this.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
    var delay = function(message,func){
        $("#targetSlide").text(message);
        showBackstage("loadingSlide");
        setTimeout(func,2500);
    }
    var ensureUserInCohort = function(name){
        cohort[name] = {
            nickname:name,
            name:name
        };
    }
    var listMembers = function(party){
        return _.pluck(party.members,"nickname").join(", ");
    }
    var inParty = function(user,party){
        return user.name in party.members;
    }
    var joinParty = function(user,party){
        $.each(parties,function(i,party){
            leaveParty(cohort[user.name],party);
        });
        party.members[user.name] = user;
        $("#groupHud").html(unwrap(_.values(party.members).map(function(who){
            return $("<img />",{
                class:"groupMemberPortrait",
                width:px(50),
                height:px(50),
                src:"http://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c0eeee?s=80&d=mm"
            });
        }))).show();
        var chat = $("#groupChat");
        chat.show();
        var addLine = function(l){
            $("<div />",{
                class:"line",
                text:l
            }).appendTo(chat);
        };
        $("<div />",{
            text:"You joined the group",
            class:"system line"
        }).appendTo(chat);
        $("#chatInput").html(
            $("<input />").on("keypress",function(e){
                if(e.keyCode == 13){
		    var t = $(this);
		    addLine(t.val());
		    t.val("");
                }
            })
        );
    }
    var leaveParty = function(user,party){
        delete party.members[user.name];
        $("#groupHud").hide();
        $("#groupChat").hide();
    }
    var visitDoc = function(party){
        var doc = $("<iframe />",{
            src:party.url
        }).css({
            position:"absolute",
            top:0,
            left:0,
            width:"100%",
            height:"100%",
            "background-color":"white"
        }).insertAfter($("#marquee"));
        var hijack = loadSlide;
        loadSlide = function(jid){
            doc.remove();
            loadSlide = hijack;
            loadSlide(jid);
        };
    }
    var isDone = function(party){
        return ("progress" in party) &&
            ("goal" in party) &&
            party.progress >= party.goal;
    }
    var partyOptions = function(party){
        var container = $("<div />",{
            class:"groupOverview"
        });
        if(!isDone(party)){
            if(inParty(cohort[username],party)){
                $("<div />",{
                    text:"Leave",
                    click:function(){
                        leaveParty(cohort[username],party);
                        delay(sprintf("Leaving %s",listMembers(party)),showPopup);
                    }
                }).appendTo(container);
            }
            else{
                if(party.isFormal){
                    $("<div />",{
                        text:"Closed",
                        title:"You may not join this group because it will be submitting this work for formal group assessment"
                    }).addClass("closedGroup").appendTo(container);
                }
                else{
                    $("<div />",{
                        text:"Join",
                        click:function(){
                            joinParty(cohort[username],party);
                            delay(sprintf("Expanding group to %s",listMembers(party)),function(){
                                switch(party.medium){
                                case "quizzing":
                                    loadSlide(party.location);
                                    getQuizzesForConversation(party.conversation);
                                    showBackstage("quizzing");
                                    break;
                                case "document":
                                    visitDoc(party);
                                    hideBackstage();
                                    break;
                                default:
                                    loadSlide(party.location);
                                    break;
                                }
                            });
                        }
                    }).appendTo(container);
                }
            }
        }
        else{
            $("<div />",{
                text:"Closed",
                title:"This group has completed their exercise",
                class:"closedGroup"
            }).appendTo(container);
        }
        return container;
    }
    var idFor = function(party){
        return "party_"+listMembers(party).hashCode();
    }
    var renderParty = function(party){
        var previewBlock = $("<div />",{
            class:"groupOverview"
        });
        var timerBlock = $("<div />",{
            class:"groupOverview"
        });
        var detailBlock = $("<div />",{
            class:"groupOverview"
        });
        var thumb = $("<img />",{
            width:px(80)
        }).appendTo(previewBlock);
        switch(party.medium){
        case "metlx":thumb.attr("src",sprintf("/thumbnail/madam/%s",party.location)); break;
        case "document":thumb.attr({
            src:"/static/images/doc.jpg",
            height:px(60)
        });
            if(inParty(cohort[username],party)){
                thumb.click(function(){
                    visitDoc(party);
                })
            }; break;
        case "quizzing":thumb.attr({
            src:"/static/images/quizzing.png",
            height:px(60)
        }).click(function(){
            showBackstage("quizzing");
        }); break;
        }
        if(party.medium == "quizzing"){
            var progressDisplay = $("<div />",{
                class:"progressDisplay",
                text:sprintf("%s / %s",party.progress,party.goal),
                title:"The minimum progress that every member of the group shares"
            }).appendTo(timerBlock);
        }
        else{
            $("<img />",{
                src:sprintf("/static/images/%s.%s",party.medium,party.medium == "document"? "jpg" : "png"),
                width:px(40),
                height:px(40)
            }).appendTo(timerBlock);
        }
        var time = $("<div />").appendTo(timerBlock);
        var options = partyOptions(party);
        detailBlock
            .append(options)
            .append($("<div />",{
                class:"groupOverview",
                html:$("<div />",{
                    class:"memberDetail",
                    text:listMembers(party)
                })
            }))
        var line = $("<div />",{
            class:"groupContainer"
        });
        line.append(previewBlock);
        line.append(timerBlock);
        line.append(detailBlock);
        var updateTime = function(){
            time.text(prettyTime(new Date() - party.startTime));
            if("progress" in party && "goal" in party){
                if(Math.random() < 0.2){
                    party.progress += 1;
                    if(isDone(party)){
                        progressDisplay.text("Done");
                        options.remove();
                        detailBlock.prepend(partyOptions(party));
                    }
                    else{
                        progressDisplay.text(sprintf("%s / %s",party.progress,party.goal));
                    }
                }
            }
            if(time.is(":visible") && !isDone(party)){
                setTimeout(updateTime,1000);
            }
        };
        setTimeout(updateTime,1000);
        line.attr("id",idFor(party));
        return line;
    }
    var renderParties = function(){
        ensureUserInCohort(username);
        var availableGroupDisplay = $("#currentGroupOverview").empty();
        var status = $("#groupingStatus").empty();
        var currentGroupDisplay = $("#currentGroup").empty();
        var groupedParties = _.groupBy(parties,function(party){
            return inParty(cohort[username],party);
        });
        if(groupedParties[true]){
            var currentParty = groupedParties[true][0];
            status.text(sprintf("You are grouped with %s",listMembers(currentParty)));
            currentGroupDisplay.html(renderParty(currentParty));
        }
        else{
            status.text(sprintf("How do you want to work today?"));
        }
        if(groupedParties[false]){
            $.each(groupedParties[false],function(i,party){
                availableGroupDisplay.append(renderParty(party));
            });
        }
    }
    var cohort = {
        llewellyn:{
            name:"llewellyn",
            nickname:"Forell",
            isFriend:true
        },
        ann:{
            nickname:"Ann31",
            name:"ann"
        },
        william:{
            nickname:"The Billster",
            name:"william"
        },
        stuart:{
            nickname:"Stu",
            name:"stuart"
        },
        ramesh:{
            nickname:"Ramses",
            name:"ramesh"
        },
        pepe:{
            nickname:"Pepe",
            name:"pepe"
        },
        june:{
            nickname:"Mrs Carter",
            name:"june"
        },
        james:{
            nickname:"jimmy",
            name:"james"
        },
        dave:{
            nickname:"Dave",
            name:"dave"
        }
    };
    var parties = [{
        location:1931006,
        medium:"metlx",
        members:{}
    },{
        medium:"document",
        url:"https://docs.google.com/document/pub?id=1LvnKG9I3NMIgfW46ALcpjQFt6EU7PAFqbSEhV3GfuWQ&amp;embedded=true",
        members:{}
    },{
        location:1931002,
        medium:"metlx",
        members:{}
    },{
        location:2436004,
        conversation:2436000,
        medium:"quizzing",
        progress:0,
        goal:2,
        members:{}
    },{
        medium:"document",
        url:"http://penny-arcade.com",
        members:{},
        isFormal:true
    }];
    joinParty(cohort.llewellyn,parties[0]);
    joinParty(cohort.ramesh,parties[1]);
    joinParty(cohort.william,parties[1]);
    joinParty(cohort.stuart,parties[2]);
    joinParty(cohort.ramesh,parties[2]);
    joinParty(cohort.pepe,parties[2]);
    joinParty(cohort.june,parties[2]);
    joinParty(cohort.stuart,parties[2]);
    $.each([cohort.llewellyn,cohort.dave],function(i,user){
        parties[3].members[user.name] = user;
    });
    $.each(parties,function(i,party){
        party.startTime = new Date() - (Math.random() * 5 * 60 * 1000);
    });
    $.each([cohort.ann,cohort.james],function(i,user){
        parties[4].members[user.name] = user;
    });
    var showPopup = function(){
        renderParties();
        $("#quizzingPopup").hide();
        showBackstage("groupFinder");
    }
    $(function(){
        $("<span />",{
            text:"Groups"
        }).click(showPopup).prependTo($("#quickMoves"));
        $("#meetingChat").attr("title","Meeting").dialog({
            closeText:"",
            resizable:false,
            resize:"auto",
            width:px(380),
            position:"left bottom",
            onClose:function(){
                return false;
            }
        });
    });
    Progress.postRender["showOffscreenGroups"] = function(){
        var viewBounds = [viewboxX,viewboxY,viewboxX+viewboxWidth,viewboxY+viewboxHeight];
        var offscreenElements = [];
        if(boardContent.contentGroups){
            $.each(boardContent.contentGroups,function(k,g){
                if(!intersectRect(viewBounds,g.bounds)){
                    offscreenElements.push(g);
                }
            });
        }
        showOffscreenElements(offscreenElements);
    }
    return {
        parties:parties,
        showPopup:showPopup
    };
})();

var Tagger = (function(){
    var tags = {};
    var savedView = {};
    var openToc = function(){
        var popupId = "tagging";
        var popup = $("<div />",{
            class:"backstage",
            id:popupId+"Popup"
        }).insertAfter($("#marquee"));
        var map = $("<div />",{
            id:"contentGroupMap"
        }).css({
            width:"100%%",
            height:"100%",
            position:"relative"
        }).appendTo(popup);
        savedView.viewboxX = viewboxX;
        savedView.viewboxY = viewboxY;
        savedView.viewboxWidth = viewboxWidth;
        savedView.viewboxHeight = viewboxHeight;
        viewboxX = boardContent.minX;
        viewboxY = boardContent.minY;
        viewboxWidth = boardContent.width;
        viewboxHeight = boardContent.height;
        $.each(boardContent.contentGroups,function(i,group){
            var b = group.bounds;
            var screenPos = worldToScreen(b.centerX,b.centerY);
            var tagList = $("<div />").css({
                position:"absolute",
                left:px(screenPos.x),
                top:px(screenPos.y + 15)
            }).appendTo(map);
            var renderTags = function(){
                if(group.identity in tags){
                    tagList.html(unwrap(tags[group.identity].map(function(t){
                        return $("<input />",{
                            type:"button",
                            value:t
                        });
                    })));
                }
            }
            renderTags();
            var marker = Canvas.circle("blue",20).css({
                position:"absolute",
                left:px(screenPos.x),
                top:px(screenPos.y)
            }).click(function(){
                $(group.canvas).css({
                    position:"absolute",
                    "background-color":"white",
                    width:px(boardWidth / 3)
                }).insertBefore(marker).show();
                if(!(group.identity in tags)){
                    tags[group.identity] = [];
                }
                var ts = prompt("Tag me! (Comma separated multiple tags are okay)");
                $(group.canvas).remove();
                if(ts){
                    tags[group.identity] = ts.split(",").map(function(t){
                        return t.trim();
                    });
                    renderTags();
                }
            }).appendTo(map);
        });
        showBackstage(popupId);
    };
    var closeToc = function(){
        viewboxX = savedView.viewboxX;
        viewboxY = savedView.viewboxY;
        viewboxWidth = savedView.viewboxWidth;
        viewboxHeight = savedView.viewboxHeight;
    };

    return {
        tags:tags,
        openToc:openToc
    };
})();

var prettyTime = function(milis){
    var sec_numb = Math.floor(milis / 1000);
    var hours   = Math.floor(sec_numb / 3600);
    var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
    var seconds = sec_numb - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = minutes+':'+seconds;
    return time;
}
