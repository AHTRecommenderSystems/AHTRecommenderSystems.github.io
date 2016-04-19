$(document).ready(function(){
   var getOrgEvents = function(){
     $('#last-events').html("<p  class='loading'>Cargando...</p>");
     $.getJSON("https://api.github.com/orgs/Ambienta2MX/events", function(json) {
       if (json.message != "Not Found"){
         var output = "<table class='table table-hover table-striped'><tr><th>Evento</th><th>Realizado por</th><th>Módulo</th><th>Fecha</th></tr>";
         var limit = 8;
         for( i = 0; i < limit ; i++){
           if(json[i].repo.name != "Ambienta2MX/ambienta2mx.github.io"){
             switch (json[i].type) {
              case "CommitCommentEvent":
                output += "<tr><td>Commented a commit. <i>\""+json[i].payload.comment.body+"\"</i>";
                break;
              case "CreateEvent":
                output += "<tr><td>Created the "+json[i].payload.ref_type+" <b>"+json[i].payload.ref+"</b>";
                break;
              case "DeleteEvent":
                output += "<tr><td>Deleted a "+json[i].payload.ref_type;
                break;
              case "DeploymentEvent":
                output += "<tr><td>Deployment to the "+json[i].payload.environment+" environment";
                break;
              case "DeploymentStatusEvent":
                output += "<tr><td>Deployment status: "+json[i].payload.deplyment_status.state;
                break;
              case "DownloadEvent":
                output += "<tr><td>A new download was created";
                break;
              case "FollowEvent":
                output += "<tr><td>"+json[i].payload.target.login+" was followed";
                break;
              case "ForkEvent":
                output += "<tr><td>The repository <b>"+json[i].payload.forkee.name+"</b> was forked.";
                break;
              case "ForkApplyEvent":
                output += "<tr><td>A patch was applied in the Fork Queue to the branch <b>"+json[i].payload.head+"</b>";
                break;
              case "GistEvent":
                output += "<tr><td>A Gist was "+json[i].payload.action;
                break;
              case "GollumEvent":
                output += "<tr><td>Wiki pages changed. ";
                for(j=0; j < json[i].payload.pages.length; j++){
                  output += "<b>"+json[i].payload.pages[j].page_name + "</b> was "+json[i].payload.pages[j].action;
                }
                break;
              case "IssueCommentEvent":
                output += "<tr><td>Commented the issue <b>"+json[i].payload.issue.title+"</b> <i>\""+json[i].payload.comment.body+"\"</i>";
                break;
              case "IssuesEvent":
                output += "<tr><td>The issue <b>"+json[i].payload.issue.title+"</b> was "+json[i].payload.action;
                break;
              case "MemberEvent":
                output += "<tr><td>The user <b>"+json[i].payload.member.login+"</b> was added as a collaborator to the repository.";
                break;
              case "MembershipEvent":
                output += "<tr><td>The user <b>"+json[i].payload.member.login+"</b> was "+json[i].payload.action+" from the team "+ json[i].payload.team.name;
                break;
              case "PageBuildEvent":
                output += "<tr><td>There was an attempted build of a GitHub Pages site";
                break;
              case "PublicEvent":
                output += "<tr><td>The private repository is now open sourced";
                break;
              case "PullRequestEvent":
                output += "<tr><td>A pull request was "+json[i].payload.action+": <i>\""+json[i].payload.pull_request.title+"\"</i>";
                break;
              case "PullRequestReviewCommentEvent":
                output += "<tr><td>A comment was created on a portion of the unified diff of a pull request. <i>\""+json[i].payload.comment.body+"\"</i>";
                break;
              case "PushEvent":
                output += "<tr><td>Pushed on <b>"+json[i].payload.ref.replace('refs/heads/','')+"</b> Last commit: <i>\""+json[i].payload.commits[0].message+"\"</i>";
                break;
              case "ReleaseEvent":
                output += "<tr><td>A <b>release</b> was published.";
                break;
              case "RepositoryEvent":
                output += "<tr><td>The repository <b>"+json[i].payload.repository.name+"</b> was created.";
                break;
              case "StatusEvent":
                output += "<tr><td>The status of the commit <i>\""+json[i].payload.commit.message+"\"</i> changed to <b>"+json[i].payload.state+"</b>";
                break;
              case "TeamAddEvent":
                output += "<tr><td>The repository was added to the team <b>"+json[i].payload.team.name+"</b>.";
                break;
              case "WatchEvent":
                output += "<tr><td>"+json[i].payload.sender.login+" had started watching (starring) the repository.";
                break;
              default:
                output += "<tr><td>"+json[i].type;
                break;
             }
             output +="</td><td><a href='"+json[i].actor.url.replace('api.','').replace('users/','')+"'>"+
             json[i].actor.login+"</a></td><td><a href='"+json[i].repo.url.replace('api.','').replace('repos/','')+"'>"+json[i].repo.name.replace('Ambienta2MX/','')+"</a></td><td>"+new Date(json[i].created_at).toLocaleString()+"</td></tr>";
           } else {
             limit += 1;
           }
         }
         output += "</table>";
         $('#last-events').html(output);
       } else {
         $('#last-events').html("<p>No se encontraron registros.</p>");
       }
     });
     return false;
   }

   var getIssues = function(){
     $('#issues').html("<p  class='loading'>Cargando...</p>");
     var output = "";
     var no = 0;
     //FastEagle
     $.getJSON("https://api.github.com/repos/Ambienta2MX/FastEagle/issues", function(json) {
       if (json.message != "Not Found"){
        output += "<table class='table table-hover table-striped'>"+
         "<tr><th>Título</th><th>Módulo</th><th>Estado</th><th>Creado</th><th>Asignado</th></tr>";
         for( i = 0; i < json.length ; i++){
           output += "<tr><td><b><a href='"+json[i].html_url+"'>"+json[i].title+"</a></b> "+json[i].body+"</td>"+
           "<td><a href='https://github.com/Ambienta2MX/FastEagle'>FastEagle</a></td><td>"+json[i].state;
           for(j = 0; j < json[i].labels.length; j++){
             output += ", "+json[i].labels[j].name;
           }
           output +="</td><td>"+new Date(json[i].created_at).toLocaleString()+"</td><td><a href='"+json[i].assignee.html_url+"'>"+json[i].assignee.login+"</a></td></tr>";
         }
       } else {
         no++;
       }
     });
     //SmartOwl
     $.getJSON("https://api.github.com/repos/Ambienta2MX/SmartOwl/issues", function(json) {
       if (json.message != "Not Found"){
         for( i = 0; i < json.length ; i++){
           output += "<tr><td><b><a href='"+json[i].html_url+"'>"+json[i].title+"</a></b> "+json[i].body+"</td>"+
           "<td><a href='https://github.com/Ambienta2MX/SmartOwl'>SmartOwl</a></td><td>"+json[i].state;
           for(j = 0; j < json[i].labels.length; j++){
             output += ", "+json[i].labels[j].name;
           }
           output +="</td><td>"+new Date(json[i].created_at).toLocaleString()+"</td><td><a href='"+json[i].assignee.html_url+"'>"+json[i].assignee.login+"</a></td></tr>";
         }
       } else {
         no++;
       }
     });
     //FastEagleMod
     $.getJSON("https://api.github.com/repos/Ambienta2MX/FastEagleMod/issues", function(json) {
       if (json.message != "Not Found"){
         for( i = 0; i < json.length ; i++){
           output += "<tr><td><b><a href='"+json[i].html_url+"'>"+json[i].title+"</a></b> "+json[i].body+"</td>"+
           "<td><a href='https://github.com/Ambienta2MX/FastEagleMod'>FastEagleMod</a></td><td>"+json[i].state;
           for(j = 0; j < json[i].labels.length; j++){
             output += ", "+json[i].labels[j].name;
           }
           output +="</td><td>"+new Date(json[i].created_at).toLocaleString()+"</td><td><a href='"+json[i].assignee.html_url+"'>"+json[i].assignee.login+"</a></td></tr>";
         }
       } else {
         no++;
       }
     });
     //FriendlyDolphin
     $.getJSON("https://api.github.com/repos/Ambienta2MX/FriendlyDolphin/issues", function(json) {
       if (json.message != "Not Found"){
         for( i = 0; i < json.length ; i++){
           output += "<tr><td><b><a href='"+json[i].html_url+"'>"+json[i].title+"</a></b> "+json[i].body+"</td>"+
           "<td><a href='https://github.com/Ambienta2MX/FriendlyDolphin'>FriendlyDolphin</a></td><td>"+json[i].state;
           for(j = 0; j < json[i].labels.length; j++){
             output += ", "+json[i].labels[j].name;
           }
           output +="</td><td>"+new Date(json[i].created_at).toLocaleString()+"</td><td><a href='"+json[i].assignee.html_url+"'>"+json[i].assignee.login+"</a></td></tr>";
         }
       } else {
         no++;
       }
     });
     //Ambienta2MX-Docs
     $.getJSON("https://api.github.com/repos/Ambienta2MX/Ambienta2MX-Docs/issues", function(json) {
       if (json.message != "Not Found"){
         for( i = 0; i < json.length ; i++){
           output += "<tr><td><b><a href='"+json[i].html_url+"'>"+json[i].title+"</a></b> "+json[i].body+"</td>"+
           "<td><a href='https://github.com/Ambienta2MX/Ambienta2MX-Docs'>Ambienta2MX-Docs</a></td><td>"+json[i].state;
           for(j = 0; j < json[i].labels.length; j++){
             output += ", "+json[i].labels[j].name;
           }
           output +="</td><td>"+new Date(json[i].created_at).toLocaleString()+"</td><td><a href='"+json[i].assignee.html_url+"'>"+json[i].assignee.login+"</a></td></tr>";
         }
       } else {
         no++;
       }
     });
     //AncientTortoise
     $.getJSON("https://api.github.com/repos/Ambienta2MX/AncientTortoise/issues", function(json) {
       if (json.message != "Not Found"){
         for( i = 0; i < json.length ; i++){
           output += "<tr><td><b><a href='"+json[i].html_url+"'>"+json[i].title+"</a></b> "+json[i].body+"</td>"+
           "<td><a href='https://github.com/Ambienta2MX/AncientTortoise'>AncientTortoise</a></td><td>"+json[i].state;
           for(j = 0; j < json[i].labels.length; j++){
             output += ", "+json[i].labels[j].name;
           }
           output +="</td><td>"+new Date(json[i].created_at).toLocaleString()+"</td><td><a href='"+json[i].assignee.html_url+"'>"+json[i].assignee.login+"</a></td></tr>";
         }
       } else {
         no++;
       }
     });
     //CuteBunny
     $.getJSON("https://api.github.com/repos/Ambienta2MX/CuteBunny/issues", function(json) {
       if (json.message != "Not Found"){
         for( i = 0; i < json.length ; i++){
           output += "<tr><td><b><a href='"+json[i].html_url+"'>"+json[i].title+"</a></b> "+json[i].body+"</td>"+
           "<td><a href='https://github.com/Ambienta2MX/CuteBunny'>CuteBunny</a></td><td>"+json[i].state;
           for(j = 0; j < json[i].labels.length; j++){
             output += ", "+json[i].labels[j].name;
           }
           output +="</td><td>"+new Date(json[i].created_at).toLocaleString()+"</td><td><a href='"+json[i].assignee.html_url+"'>"+json[i].assignee.login+"</a></td></tr>";
         }
       } else {
         no++;
       }
     });
     //CleverBeaver
     $.getJSON("https://api.github.com/repos/Ambienta2MX/CleverBeaver/issues", function(json) {
       if (json.message != "Not Found"){
         for( i = 0; i < json.length ; i++){
           output += "<tr><td><b><a href='"+json[i].html_url+"'>"+json[i].title+"</a></b> "+json[i].body+"</td>"+
           "<td><a href='https://github.com/Ambienta2MX/CleverBeaver'>CleverBeaver</a></td><td>"+json[i].state;
           for(j = 0; j < json[i].labels.length; j++){
             output += ", "+json[i].labels[j].name;
           }
           output +="</td><td>"+new Date(json[i].created_at).toLocaleString()+"</td><td><a href='"+json[i].assignee.html_url+"'>"+json[i].assignee.login+"</a></td></tr>";
         }
         output += "</table>";
         $('#issues').html(output);
       } else {
         if(no==7)
          $('#issues').html("<p>No se encontraron registros.</p>");
       }
     });
     return false;
   }
   getIssues();
   getOrgEvents();
});
