
<?php
/*
Plugin Name: SI Tool
Description: This is custom shortcode [SI_tool] plugin for SI tool 
Author: gld.digital
Version: 0.1
Author URI: gld.digital
*/

define('SI_PLUGIN_URL', plugins_url( 'si-tool-plugin/', dirname(__FILE__) ));



add_action( 'init', 'ksm_plugin_scripts_load' );
function ksm_plugin_scripts_load()
{
    if($_GET['show'] == 'SI_tool')
    {?>

<link href="<?php echo SI_PLUGIN_URL ?>css/grid.css" media="screen" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<?php echo SI_PLUGIN_URL ?>css/css/editor.css" type="text/css" />
<script type="text/javascript" src="<?php echo SI_PLUGIN_URL ?>js/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo SI_PLUGIN_URL ?>js/tinymce.min.js" type="text/javascript"></script>
<script type="text/javascript" src="<?php echo SI_PLUGIN_URL ?>js/jquery.tinymce.min.js" type="text/javascript"></script>
<script type="text/javascript" src="<?php echo SI_PLUGIN_URL ?>js/pdfmake.min.js"></script>
<script type="text/javascript" src="<?php echo SI_PLUGIN_URL ?>js/vfs_fonts.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css">


<link href="<?php echo SI_PLUGIN_URL ?>css/home.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?php echo SI_PLUGIN_URL ?>css/browse.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?php echo SI_PLUGIN_URL ?>css/search.css" media="all" rel="stylesheet" type="text/css" />

<script type="text/javascript" src="<?php echo SI_PLUGIN_URL ?>js/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="<?php echo SI_PLUGIN_URL ?>js/jquery.dataTables.min.js"></script>
<link rel="stylesheet" href="<?php echo SI_PLUGIN_URL ?>css/gldDataTables.css" />
<link href="<?php echo SI_PLUGIN_URL ?>css/stylesheets.css" media="all" rel="stylesheet" type="text/css" />
<link href="<?php echo SI_PLUGIN_URL ?>css/medium-editor.min.css" media="all" rel="stylesheet" type="text/css" />
<script type="text/javascript"  src="<?php echo SI_PLUGIN_URL ?>js/medium-editor.min.js"></script>
<script type="text/javascript" src="<?php echo SI_PLUGIN_URL ?>js/editor/jquery-ui.min.js"></script>

<link rel="stylesheet" href="<?php echo SI_PLUGIN_URL ?>css/si/modal.css">
<link rel="stylesheet" href="<?php echo SI_PLUGIN_URL ?>css/si/override.css">
<script  type="text/javascript" src="<?php echo SI_PLUGIN_URL ?>js/si/jquery.min.js"></script>
<script  type="text/javascript" src="<?php echo SI_PLUGIN_URL ?>js/si/bootstrap.min.js"></script>
<script  type="text/javascript" src="<?php echo SI_PLUGIN_URL ?>js/si/models.js"></script>
<script  type="text/javascript" src="<?php echo SI_PLUGIN_URL ?>js/si/jquery.gldSiTimetable.js"></script>
    <script>
        /*jshint unused:false*/
        var actionDurations = []
        var answers = new AnswersCollection({
            'question1': new Date()
        });
    </script>
<script>
    $(document).ready(function(){
        $("#show").click(function(){
            $(".preview").slideToggle();

            if($(this).text() == 'Hide questions')
        {
            $(this).text('Preview questions');
        }
        else
        {
            $(this).text('Hide questions');   
        }
        });
    });
</script>
    <!-- Include Bootstrap CSS -->
    <div class="grid-row-extra padding:0;" style="margin-top:32px">
        <div id="intro">
            <div class="panel panel-default" >
                <div class="panel-body si-start-page">
                    <div class="column-four-fifths center clearfix">
                        <h1 class="header-line">Create a timetable for your statutory instrument</h1>
                    </div>
                    <div class="column-four-fifths center clearfix">
                        <h2 class="header-line2 screen-1">Are you looking to change the law by statutory instrument (SI)? </h2>
                        <p class="screen-1" style="font-size:1em">
                            This (BETA) tool will help you build a timetable showing you the number of days needed to complete your SI. 
                            The initial timetable created will be based on the answers you give and best practice amounts of time to undertake particular tasks. 
                            Once generated, you can manually increase or decrease the periods of time (days) in the timetable. 
                            This tool takes account of bank holidays and working days (Monday to Friday), and 
                            approximate Parliamentary sitting and recess days. 
                        </p>     
                        <p>
                          <strong> Before you get going though, these are some other things we need to draw to your attention:  </strong>
                        </p>          

                        <div class="box screen-1">
                            <h3>You’ll get asked some questions</h3>
                            <p>
                                You’ll get asked some questions. You’ll get asked the following questions when using this tool. 
                                So you’ll want to have a think about these in advance. You can still try the tool out, even if you’re not sure about all the answers yet. 
                            </p>
                            <button id="show">Preview questions</button>
                            <div class="preview" style="display:none">
                                <ol>
                                    <li>What will be the commencement date for your SI? <span>(You will be asked to specify a date). </span></li>
                                    <li>What parliamentary procedure will your SI be subject to? <span> (Negative, affirmative or none).</span></li>
                                    <li>How legally complex will your SI be? <span>(Simple, Medium, Complex).</span></li> 
                                    <li>What length will your SI be? <span>(Small/up to 5 pages; medium/6-20 pages, large/21+ pages)</span></li>
                                    <li>Whether you’d like your timetable to factor in time to carry out or produce:
                                        <ul>
                                            <li>Whether you need time to develop and consult on policy proposals</li>
                                            <li>A consultation on the draft SI, and if so for how long</li>
                                            <li>An impact assessment(s)</li>
                                            <li>An equality analysis</li> 
                                            <li>Consultation with devolved government in Scotland, Wales or Northern Ireland</li> 
                                            <li>A translation of your instrument in to Welsh</li> 
                                            <li>Guidance </li>
                                        </ul>
                                    </lI> 
                                    <li>Whether your instrument will amend primary legislation.</li>
                                    <li>Whether the SI will require a technical standards notification. </li>
                                </ol>  
                            </div> 
                        </div>
                        <div class="box screen-1">
                             <h3>Consult your lawyer</h3>
                            <p>
                               Before finalising your timetable, do consult with your lawyer to agree it. They will also help you work out which stages in the timetable do not need to be done consecutively. (Future versions of this tool will be able to show activities running in parallel/concurrently.) 
                            </p>
                        </div>
                        <div class="box screen-2 hidden">
                            <h3 class="header-line2">This is a BETA tool</h3>
                            <p>
                                This means we’re still developing it, and we’re actively seeking 
                                feedback on we can improve it. Give us your feedback at digital@governmentlegal.gov.uk 
                            </p>
                        </div>
                         <div class="box screen-2 hidden">
                             <h3> Please print or save your timetable as a PDF</h3>
                             <p>
                            Currently, the timetable produced is not saved in gld.digital 
                        - it effectively only lasts while it’s on-screen on our live site. This means you must immediately print it,
                         or download it/save it as pdf if you want a copy (e.g. to share with colleagues). We’re working on being 
                         able to save timetables in our system. If you want to amend a timetable you saved or printed previously, 
                         unless it’s live on-screen still, you’ll need to quickly use the tool again.   
                            </p>
                        </div>
                        <div class="box screen-2 hidden">
                             <h3>New SI projects</h3>
                            <p>
                                If you’re embarking on a new SI project, you’ll need to input details of that in to the separate “Legislative Programme Tool”. 
                                PBL Secretariat use information in that, to plan the legislative programme. 
                                Details of how to do this should be available from your Parliamentary branch. 
                            </p>
                        </div>
                           
                        <div class="message-box-blue" style="display:none">
                            <h3  class="header-line3">More information</h3>
                        </div>
                        <div class="intro-footer text-right">
                            <button type="button" class="intro-btn-next button">Next</button>&nbsp;
                            <button type="button" class="sw-btn-start button hidden">Start</button>&nbsp;
                            <button type="button" class="-sw-btn-load button hidden" style="margin-right: 5px;">Load Data</button>&nbsp; 
                            <button type="button" class="intro-btn-prev button hidden">Prev</button>&nbsp;
                            <input type="file" class="hidden" id="load-json-input" name="files[]" multiple />                          
                        </div> 
                    </div>     
                </div>
            </div>            
        </div>
    <!-- SmartWizard html -->
   
        <div id="smartwizard" class="sw-main sw-theme-arrows hidden" style="display: none;">
            <ul>
                <li><a href="#step-1"><span>Date</span></a></li>
                <li data-print='false'><a href="#step-2"><span>Procedure</span></a></li>
                <li><a href="#step-3"><span>Complexity</span></a></li>
                <li><a href="#step-4"><span>Length</span></a></li>
                <li class="two-lines"><a href="#step-5"><span>Requirements</span></a></li>
                <li><a href="#step-6"><span>Legislation</span></a></li>
                <li><a href="#step-7"><span>Notification</span></a></li>
                <li class="si-step"><a href="#step-8"><span>SI Table</span></a></li>
            </ul>
            <div class="questions-container">
                <ul class="answer-list">
                    <li><a href="#step-1"><span id="ans01"></span></a></li>
                    <li data-print='false'><a href="#step-2"><span id="ans02"></span></a></li>
                    <li><a href="#step-3"><span id="ans03"></span></a></li>
                    <li><a href="#step-4"><span id="ans04"></span></a></li>
                    <li><a href="#step-5">
                            <span id="ans05" data-toggle="popover" title="Answers" data-trigger="hover"  data-content="" data-placement="bottom" data-html="true"></span>
                        </a>
                    </li>
                    <li><a href="#step-6"><span id="ans06"></span></a></li>
                    <li><a href="#step-7"><span id="ans07" style="line-height:1em"></span></a></li>
                </ul>
                <div id="step-1" class="">
                    <div class="grid-row-extra padding:0;">
                        <section>
                            <div class="question-body column-three-fifths">
                                 <h2><span class="text-left">Commencement date</span></h2>
                                <p>When should the statutory instrument come into force?
                                </p> 
                                <ul class="options">
                                    <!--
                                    <li>
                                        <label for="A1" class="selectable selection-button-radio selected">
                                            <span  class="radio-btn"><input type="radio" name="response1" id="A1" value="10-01-2018"></span>                       
                                            <span class="label-text">1st October 2018</span>
                                        </label>
                                        <p class="text-right question-help">
                                            <span data-toggle="popover" title="1st October 2018" data-trigger="hover"  
                                            data-content="This set date is part of government policy known as common commencement dates." data-placement="left">
                                            More info <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="24px" height="24px">
                                            </span>
                                        </p>
                                    </li>
                                    <li style="display:none">
                                    <label for="A2" class="selectable selection-button-radio selected">
                                        <span  class="radio-btn"><input type="radio" name="response1" id="A2" value="03-29-2019"></span>                              
                                        <span  class="label-text">29th March 2019</span>
                                    </label>
                                     <p class="text-right question-help">
                                <span data-toggle="popover" title="EU Exit day (provisional)." data-trigger="hover"  
                                data-content="In the absence of knowing exactly when EU Exit day is, 29/3/2019 is suggested here on the basis that this is two years from when article 50 was triggered by the Prime Minister." data-placement="left">
                                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="24px" height="24px">
                                </span>
                            </p>
                                </li>
                                 <li>
                                    <label for="A0" class="selectable selection-button-radio">
                                         <span class="radio-btn"> <input type="radio" name="response1" id="A0" value="04-06-2019"></span>
                                        <span class="label-text">6th April 2019</span> 
                                    </label>
                                  <p class="text-right question-help">
                                <span data-toggle="popover" title="6th April 2019" data-trigger="hover"  
                                data-content="This set date is part of government policy known as common commencement dates." data-placement="left">
                                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="24px" height="24px">
                                </span>
                            </p>
                                </li>
                                -->

                              <li>
                                <label for="A3" class="selectable selection-button-radio selected">    
                                    <span  class="radio-btn"><input type="radio" name="response1" id="A3" value="A3"></span>                         
                                        <span  class="label-text">Please specify</span>
                                    <span id="dateHide"><input type="text" id="datepicker"></span>
                                </label>
                                <p class="text-right question-help">
                                    <span class='selector' data-toggle="popover" title="" data-html="true" data-trigger="click"  
                                    data-content="Please choose the date your SI should commence. Westminster based regulation bearing on business should 
                                    normally be commenced only on either 6th April or 1st October. You can find out more 
                                    <a href='https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/32233/10-1137-common-commencement-dates-august2010.pdf'>here</a>" data-placement="left">
                                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="24px" height="24px">
                                    </span>
                                </p>
                            </li>
                            </ul>
                         </div>
                    </section>
                    </div>
                </div>
                <div id="step-2" class="grid-row-extra padding:0;"> 
                    <section>
                        <div class="question-body  column-three-fifths">
                            <h2>Parliamentary procedure</h2>
                            <p>What parliamentary procedure will this statutory instrument be subject to? The procedure will be set out in primary legislation.
                            </p>    
                            <ul class="options">
                                <li>
                                    <label for="A4" class="selectable selection-button-radio">
                                        <span  class="radio-btn"><input type="radio" name="response2" id="A4" value="affirmative"></span>
                                        <span  class="label-text"> Affirmative procedure</span>
                                    </label>
                                    <p class="text-right question-help">
                                        <span data-toggle="popover" title="" data-trigger="hover"  data-content="SI requires the formal approval of both Houses of Parliament before it becomes law." data-placement="left">
                                         More info
                                        <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png"  width="24px" height="24px">
                                        </span>
                                    </p>
                                </li>
                                <li>
                                    <label for="A5" class="selectable selection-button-radio selected">
                                        <span  class="radio-btn"><input type="radio" name="response2" id="A5" value="negative"></span>
                                        <span  class="label-text">Negative procedure</span>
                                    </label>
                                    <p class="text-right question-help">
                                        <span data-toggle="popover" title="" data-trigger="hover"  
                                        data-content="SI will automatically become law without debate unless there is an objection from either House of Parliament." data-placement="left">
                                        More info<img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="24px" height="24px">
                                        </span>
                                    </p>
                                </li>
                                <li>
                                    <label for="A6" class="selectable selection-button-radio selected">
                                        <span  class="radio-btn"> <input type="radio" name="response2" id="A6" value="no"></span>
                                        <span  class="label-text">No procedure</span>
                                    </label>
                                    <p class="text-right question-help">
                                        <span data-toggle="popover" title="" data-trigger="hover"  
                                            data-content="SI does not have any parliamentary procedure (e.g. commencement regulations)." data-placement="left">
                                            More info<img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="24px" height="24px">
                                        </span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
                <div id="step-3" class="" >
                    <section>
                        <div class="question-body column-three-fifths">
                            <h2>Legal complexity  </h2>
                            <p class="text-right" style="display:none">
                            <span data-toggle="popover" title="Legal Complexity" data-trigger="hover"  data-content="How legally complex will this statutory instrument be?
                            Legal complexity Consult your lawyer about the legal complexity of your SI." data-placement="left">
                                More info
                                <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png"  width="24px" height="24px">
                            </span>
                             </p>
                            <p>How legally complex will this statutory instrument be? Consult your lawyer about the legal complexity of your SI.</p>
                      
                            <ul class="options">
                                <li>
                                    <label for="A7" class="selectable selection-button-radio">   
                                        <span  class="radio-btn"><input type="radio" name="response3" id="A7" value="simple"> </span>
                                        <span  class="label-text">Simple</span>
                                    </label>
                                    <p class="text-right">
                                        <span data-toggle="popover" title="Simple" data-trigger="hover"  
                                        data-content="Policy is clear, well-developed, straightforward and uncontroversial. SI has little relationship to other legislation and is
                                        entirely a matter of domestic law." data-placement="left">
                                        More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="24px" height="24px">
                                        </span>
                                    </p>
                                    </li>
                                <li>
                                    <label for="A8" class="selectable selection-button-radio selected">
                                        <span  class="radio-btn"><input type="radio" name="response3" id="A8" value="medium"></span>
                                        <span  class="label-text"> Medium</span>
                                    </label>
                                    <p class="text-right">
                                        <span data-toggle="popover" title="Medium" data-trigger="hover"  
                                        data-content="There are no major interactions with other legislation but the policy has some depth." data-placement="left">
                                        More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="24px" height="24px">
                                        </span>
                                    </p>
                                </li>
                                <li>
                                    <label for="A9" class="selectable selection-button-radio selected">
                                        <span class="radio-btn"><input type="radio" name="response3" id="A9" value="complex"></span>
                                        <span  class="label-text">Complex</span>
                                    </label>
                                        <p class="text-right">
                                            <span data-toggle="popover" title="Complex" data-trigger="hover"  
                                                data-content="Policy ranges over a number of areas
                                                and is complicated. SI has lots of interactions
                                                with different pieces of legislation. Involves
                                                devolution issues. SI implements complex
                                                EU or international obligations which conflict
                                                with existing domestic legislation." data-placement="left">
                                                More info <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="24px" height="24px">
                                            </span>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                    </section>
                </div>
                <div id="step-4" class="">
                    <section>
                        <div class="question-body   column-three-fifths">
                        <h2>Length</h2>
                        <p>How long (number of pages) is your statutory instrument likely to be? Consult your lawyer about the length of your SI.</p>
                                <ul class="options">
                                    <li>
                                        <label for="A10" class="selectable selection-button-radio">
                                            <span class="radio-btn"><input type="radio" name="response4" id="A10" value="small"></span>
                                            <span  class="label-text">Up to 5 pages (small)</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label for="A11" class="selectable selection-button-radio selected">
                                             <span class="radio-btn"><input type="radio" name="response4" id="A11" value="medium"></span>
                                             <span  class="label-text">6-20 pages (medium)</span>
                                          </label>
                                    </li>
                                    <li>
                                        <label for="A12" class="selectable selection-button-radio selected">
                                            <span class="radio-btn"><input type="radio" name="response4" id="A12" value="large"></span>
                                              <span  class="label-text">21+ pages (large)</span>
                                         </label>
                                    </li>
                                </ul>
                            </div>
                    </section>
                </div>
                <div id="step-5" class="">
                    <section>
                        <div class="question-body   column-three-fifths">
                            <h2>Additional requirements</h2>  
                            <p>Would you like your timetable to include time for any of following processes?</p> 
                        <ul class="options">
                            <li>   
                                <label for="A22" class="selectable selection-button-radio">
                                     <span class="radio-btn"> <input type="checkbox" name="response5" id="A22" value="proposals"></span>
                                       <span  class="label-text">Policy proposals</span>
                                     
                                      
                                </label>
                                <p class="text-right question-help">
                                    
                                    <span href="#" class='selector' data-toggle="popover" data-html="true" title="Proposals" data-trigger="click"  
                                        data-content="You can read more about this, and about the roles of the Reducing Regulation Committee and the Regulatory Policy Committee <a href='https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/735587/better-regulation-framework-guidance-2018.pdf'>here</a>" data-placement="left">
                                        More info <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="24px" height="24px">
                                        </span>           
                                </p>
                                 <p class="proposal-days hidden" style="display: none; float:left;width:100%;margin-top:0;">How long will this run for? 
                                            <br>
                                                    <input type="number" default="10" value="10" min="0" data-min="0" id="proposal-days">Calendar days
                                            <br>
                                            <span style="font-decoration:italic;font-size:0.9em;position:relative;top:4px;font-weight:700">Do you need time for policy officials to develop and consult on policy proposals?</span>              
                                </p>
                            </li>
                            <li class="a13-question">   
                                <label for="A13" class="selectable selection-button-radio">
                                     <span class="radio-btn"> <input type="checkbox" name="response5" id="A13" value="consultation"></span>
                                       <span  class="label-text">Do you need time for policy officials to develop and consult on policy proposals?</span>
                                     
                                      
                                </label>
                                <p class="text-right question-help">
                                    
                                    <span href="#" data-toggle="popover" title="Consultation" data-trigger="hover"  
                                        data-content="This allows time for a consultation on your draft SI with a wider stakeholder group. You may be required by primary legislation to do this." data-placement="left">
                                        More info <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="24px" height="24px">
                                        </span>           
                                </p>
                                 <p class="consultation-days hidden" style="display: none; float:left;width:100%;margin-top:0;">How long will this run for? 
                                            <br>
                                                  	<input type="number" default="10" value="10" min="0" data-min="0" id="consultation-days"/>Calendar days
                                            <br>
                                            <span style="font-decoration:italic;font-size:0.9em;position:relative;top:4px;font-weight:700">Please be aware that there may be statutory or other requirements to consult</span>              
                                </p>
                            </li>
                            <li>
                                <label for="A14" class="selectable selection-button-radio">
                                    <span class="radio-btn"> <input type="checkbox" name="response5" id="A14" value="Impact Assessment"></span>
                                     <span  class="label-text">Impact assessment</span>
                                </label>
                                 <p class="text-right question-help">
                                    <span data-toggle="popover" title="Impact Assessment (IA)" data-trigger="hover"  
                                    data-content="All SIs of a regulatory nature that affect the private sector, civil society organisations and public services should have an impact assessment evaluating the likely costs
                                    and benefits and the associated risks of the proposal. IAs are drafted by policy colleagues and economists rather than lawyers." data-placement="left">
                                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="24px" height="24px">
                                    </span>           
                                </p>
                            </li>
                             <li>
                                <label for="A15" class="selectable selection-button-radio">
                                     <span class="radio-btn"> <input type="checkbox" name="response5" id="A15" value="Equality Analysis"></span>
                                       <span  class="label-text">Equality analysis</span>
                                </label>
                                 <p class="text-right question-help">
                                    <span data-toggle="popover" title="Equality analysis" data-trigger="hover"  
                                    data-content="Make sure you’ve assessed the effects of the proposed statutory instrument on disadvantaged or vulnerable people, taking account of the views of all parties you’ve consulted." data-placement="left">
                                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="24px" height="24px">
                                    </span>           
                                </p>
                            </li>
                             <li>
                                <label for="A16" class="selectable selection-button-radio" style="height:56px;width:90%">
                                    <span class="radio-btn"><input type="checkbox" name="response5" id="A16" value="Consultation with devolved government"></span>
                                    <span  class="label-text" > Consultation with devolved government (i.e. Wales, Northern Ireland, Scotland), or any other part of government
                                    </span>
                                </label>                                
                            </li>       
                            <ul class="question5-choice hidden">
                                    <li>
                                        <label for="A17" class="selectable selection-button-radio" style="width:90%">
                                            <span class="radio-btn"><input type="checkbox" name="response5" id="A17" value="Welsh translation"></span>
                                            <span  class="label-text">Time to translate the instrument into Welsh
                                            </span>
                                        </label>
                                    </li>
                                </ul>                      
                              <li>
                                <label for="A17b" class="selectable selection-button-radio">
                                    <span class="radio-btn"><input type="checkbox" name="response5" id="A17b" value="guidance"></span>
                                    <span  class="label-text">Guidance</span>
                                </label>
                                 <p class="text-right question-help">
                                                    <span href="#" data-toggle="popover" title="Guidance" data-trigger="hover"  
                                    data-content="This will allow time for any accompanying guidance that needs to be produced in conjunction with the SI. This should be available 
                                    at the same time the SI is finished." data-placement="left">
                                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="24px" height="24px">
                                    </span>           
                                        </p>
                            </li>
                        </ul>
                        <div class="recommendations-small" style="width:100%; padding-left:100px;margin-top:30px;">
                            Don’t forget, that you’ll also need to produce an explanatory memorandum, and a Parliamentary handling plan
                        </div>   
                    </div>
                    </section>
                </div>
                <div id="step-6" class="">
                 <section>
                     <div class="question-body  column-three-fifths">
                        <h2>Primary legislation</h2>
                        <p>Will this statutory instrument amend primary legislation?</p>
                   
                        <ul class="options">
                            <li>
                                <label for="A18" class="selectable selection-button-radio">
                                    <span class="radio-btn"><input type="radio" name="response6" id="A18" value="yes"></span>
                                     <span  class="label-text">Yes</span>
                                </label>
                                  <p class="text-right">
                                    <span  data-toggle="popover" title="Yes" data-trigger="hover"  data-content="The SI will amend an existing Act of Parliament." data-placement="left">
                                    More info
                                    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png"  width="24px" height="24px">
                                    </span>
                                </p>
                            </li>
                            <li>
                                <label for="A19" class="selectable selection-button-radio">
                                    <span class="radio-btn"> <input type="radio" name="response6" id="A19" value="no"></span>
                                     <span  class="label-text">No</span>
                                </label>
                                 <p class="text-right question-help">
                                    <span data-toggle="popover" title="No" data-trigger="hover"  data-content=" The SI will not change an existing Act of Parliament." data-placement="left">
                                    More info
                                    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png"  width="24px" height="24px">
                                    </span>
                                </p>

                            </li>
                        </ul>
                    </div>
                </section>
                  </div>
                <div id="step-7" class="">
                    <section>
                        <div class="question-body  column-three-fifths">
                            <h2>Technical Standards Notification 
                                <span style="float: right; font-size: 15px; font-weight: normal;">
                                    <span class='selector' data-toggle="popover" title="Yes" data-trigger="click" data-html=true data-content="To prevent new technical barriers to trade, the UK is required to tell the European Commission about technical regulations at a draft stage. There will be a mandatory 3-month standstill period. Click here for more details on
                                     <a target='_blank' href='https://gld.digital/changing-the-law/what-else-do-i-need-to-know-before-i-change-the-law/eu-technical-standards/'>EU Technical Standards</a>" data-placement="left">
                                        More info 
                                        <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png"  width="24px" height="24px">
                                    </span>
                                </span>
                            </h2>
                            <p>Will this statutory instrument require a Technical Standards Notification?
                            </p>                            
                            <ul class="options">
                                <li>
                                    <label for="A20" class="selectable selection-button-radio">
                                        <span class="radio-btn"><input type="radio" name="response7" id="A20" value="yes"></span>
                                        <span  class="label-text">Yes</span>
                                    </label>
                                </li>
                                <li>
                                    <label for="A21" class="selectable selection-button-radio">
                                        <span class="radio-btn"> <input type="radio" name="response7" id="A21" value="no"></span>
                                        <span  class="label-text">No</span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>  
                  <!--
                    <div id="step-7" class="">  
                    <section>
                    <div class="question-body  column-three-fifths">
                        <h2>EU law</h2>
                        <p>Is this statutory instrument related to EU law?
                        <br>
                        Consider DExEU clearance </p>
                        <ul class="options">                            
                            <li>
                                <label for="A22" class="selectable selection-button-radio">
                                     <span class="radio-btn"><input type="radio" name="response7" id="A22" value="no" tabindex="0"></span>
                                     <span  class="label-text">No</span>
                                </label>
                            </li>
                            <li>
                                <label for="A23" class="selectable selection-button-radio">
                                     <span class="radio-btn"><input type="radio" name="response7" id="A23" value="yes"  tabindex="0"></span>
                                     <span  class="label-text">Yes</span>
                                </label>
                            </li>
                           
                        </ul>
                    </div>
                </section>
                </div>
                -->
                <div id="step-8" class="">  
                    <div class="si-timetable-intro row">
                        <div class="col-sm-7">
                            <label class="title">  
                                <span class="sub-headings">Your answers</span>
                            </label>
                            <div class="sw-main sw-theme-arrows sw-theme-default si-step-anchor intro-placeholder"></div>
                            <div class="proposed-date-container">
                                <a href="#step-1" class="com-date-label">
                                    <span>Proposed Commencement Date:</span></a> 
                                <a href="#step-1" class="com-date-button">
                                    <span class="com-date"></span>
                                </a>     
                            </div>
                              <div class="proposed-date-container">
                                <button class="button" id="back-button">< Back to questions</button>  
                            </div>



                        </div>
                        <div class="col-sm-5">
                            <div class="recommendations">
                                <label>  
                                    <span  class="sub-headings">Please note</span>
                                </label>           
                                <ul>
                                    <li style="margin-bottom:14px;float:left">At present <strong>we can't yet save</strong> the SI timetable created below. 
                                    We strongly advise you either print to paper or save a local pdf copy.<!-- We are still developing the tool to allow you to save timetables.-->
                                     </li>
                                    <li style="margin-bottom:14px;float:left">
                                        Don’t forget, that you’ll also need to produce an explanatory memorandum, and a Parliamentary handling plan.
                                    </li>
                                    <li class="alert alert-warning si-warning-date-wrapper red-warning" style="margin-bottom:14px !important;">
                                        <p class="hidden">Based on your answers and best practice, your SI project should start/have started on <strong><span class="si-warning-date"></span></strong>. 
                                        It may still be possible to meet your proposed SI commencement date by manually deducting days from some of the stages below. 
                                        Please make sure you do this in discussion with your drafting lawyer.</p>
                                    </li>
                                  
                                </ul>
                                <h3 class="file-name-loaded hidden">File name loaded: <span></span></h3>
                            </div>
                        </div>
                    </div>                 
                    <section class="final-timetable">
                        <p class="question"></p>
                        <div class="question-body">
<table class="si-table table table-bordered table-striped">
    <thead>
        <tr>
            <th width="20%">Stage</th>
            <th>Action</th>
            <th width="10%">Start</th>
            <th class="end-date-cell" width="10%">End</th>
           <th width="11%">Days</th>
        </tr>
    </thead>
    <tbody>
        <tr class="header-row" data-header="header-1" valign="middle"  style="vertical-align: middle" >
            <td class="stage" rowspan="3"  valign="middle"  style="border-bottom:4px solid #333" valign="middle; vertical-align: middle">
                <p class="title">Policy Instruc<span class="visible-mobile">-</span>tions</p>
            </td>
            <td class="action">
                <span class="title">Policy official develops and consults on policy proposals</span>
                 <span data-toggle="popover" title="Policy development" data-trigger="hover"  
                    data-content="This tool assumes that you have developed and consulted on your policy proposals. If you need to build in time for this, you can add days here." data-placement="left" class="info-button">
                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="18px" height="18px">
                </span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="10" min="0" data-min="0" class="si-proposal" id="inp-001"/>
            
            <script data-unit="working-days">actionDurations.push(function () {
                if (answers.notEmpty('question5')) {
                    if (answers.get('question5').indexOf('proposals') != -1) {
                        return $(".proposal-days input").val() || 10;
                    }
                }
 
                return false
            });</script>
            </td>
        </tr>
 
        <tr data-header="header-1">
            <td class="action">
                <span class="title">Policy official and lawyer discuss initial requirements</span>
                 
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="10" min="0" data-min="0" id="inp-002"/>
            
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function () {
                return 10
            })</script>
            </td>
        </tr>

        <tr data-header="header-1" style="border-bottom:4px solid #333">
            <td class="action">
                <span class="title">Policy official prepares instructions to lawyer</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="5" min="0" data-min="0" id="inp-003"/>
            
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function () {
                return 5
            })</script>
            </td>
        </tr>
 
        <tr class="header-row" data-header="header-2" valign="middle"  >
            <td class="stage" rowspan="4" style="border-bottom:4px solid #333">
                <span class="title">Drafting</span>
            </td>
            
            <td class="action">
                <span class="title">Lawyer prepares first draft of SI</span>
                  <span data-toggle="popover" title="Lawyer's first draft" data-trigger="hover"  
                    data-content="This period includes time for you to check if drafting meets policy aim." data-placement="left" class="info-button">
                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="18px" height="18px">
                </span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" min="0" data-min="0" id="inp-004"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function (answers) {
                var answer3Map = {
                    simple: 0.5,
                    medium: 2,
                    complex: 3
                }
                var answer4Map = {
                    small: 5,
                    medium: 11,
                    large: 21
                }
                if (answers.notEmpty('question3') && answers.notEmpty('question4')) {
                    var ans3 = answer3Map[answers.get('question3')];
                    var ans4 = answer4Map[answers.get('question4')];
 
                    if (ans3*ans4) {
                        return ans3*ans4;
                    }
                }
 
                return 0;
            })</script>
            </td>
        </tr>
        <tr data-header="header-2">
            <td class="action">
                <span class="title">Lawyer produces revised draft of SI</span>
                 <span data-toggle="popover" title="Revised draft" data-trigger="hover"  
                    data-content="You and your lawyer will need to discuss the changes that will need to be made to first draft."  data-placement="left" class="info-button">
                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="18px" height="18px">
                </span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="2.5" min="0" data-min="0" class="revised-drafts-default" id="inp-005"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function (answers) {
                var answer3Map = {
                    simple: 0.5,
                    medium: 2,
                    complex: 3
                }
                var answer4Map = {
                    small: 5,
                    medium: 11,
                    large: 21
                }
                if (answers.notEmpty('question3') && answers.notEmpty('question4')) {
                    var ans3 = answer3Map[answers.get('question3')];
                    var ans4 = answer4Map[answers.get('question4')];
 
                    $(".revised-drafts-default").attr("default", ans4*0.5);
                    if (ans3*ans4) {
                        return ans3*ans4;
                    }                   
                }
 
                return 0;
            })</script>
            </td>
        </tr>
        <tr data-header="header-2">
            <td class="action">
                <span class="title">Policy official consults informally with stakeholders and other departments</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="10" min="0" data-min="0" id="inp-006"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function () {
                return 10
            })</script>
            </td>
        </tr>
        <tr data-header="header-2" style="border-bottom:4px solid #333">
            <td class="action">
                <span class="title">Lawyer checks and revises accompanying documents</span>
                 <span data-toggle="popover" title="Accompanying document checking and revisions" data-trigger="hover"  
                    data-content="Lawyers will need to check that the draft SI and any accompanying documents align (e.g. guidance, impact assessments etc.)." data-placement="left" class="info-button">
                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="18px" height="18px">
                </span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" min="0" data-min="2" default="10" id="inp-007"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function () {
                return 10
            })</script>
            </td>
        </tr>
        
        <tr data-header="header-3" class="header-row">
            <td class="stage" rowspan="8"  style="border-bottom:4px solid #333"  valign="middle">
                <span class="title">Pre-consult<span class="visible-mobile">-</span>ation approval</span>
            </td>
 
 
            <td class="action">
                <span class="title">Second lawyer checks draft SI</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="10" min="0" data-min="0" id="inp-008"/>
            <p class="validation"></p>
 
 
            
            <script data-unit="working-days">actionDurations.push(function (answers) {
                if (answers.notEmpty('question5')) {
                    if (answers.get('question5').indexOf('consultation') != -1) {
                        return 10
                    }
                }               
 
                return false
            })</script>
            </td>
        
        </tr>
        <tr data-header="header-3">
 
        
            <td class="action">
                <span class="title">Lawyer seeks Parliamentary Counsel clearance</span>
                 <span data-toggle="popover" title="Parliamentary Counsel clearance" data-trigger="hover"  
                    data-content="If needed." data-placement="left" class="info-button">
                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="18px" height="18px">
                </span>
                
                
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="20" min="20" data-min="20" id="inp-009"/>
            <p class="validation"></p>
            <!--
            <script data-unit="working-days">actionDurations.push(function (answers) {
                
                if (answers.notEmpty('question5') || (answers.notEmpty('question2') && answers.notEmpty('question6'))) {
                    if (answers.get('question5').indexOf('consultation') != -1 ||
                        answers.get('question2') == 'affirmative' && answers.get('question6') == 'yes') {
                        return 20
                        
                    }
                }
 
                return false
            })</script>
            -->
            <script data-unit="working-days">actionDurations.push(function (answers) {
                
                if (answers.notEmpty('question6')) {
                    if (answers.get('question6') == 'yes' && answers.get('question5').indexOf('consultation') != -1) {
                        return 20       
                    }
                }
                return false
            })</script>
 
 
        </td>
 
        
        </tr>
        <tr data-header="header-3">
            <td class="action"> 
                <span class="title">Third lawyer checks draft SI</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="10" min="0" data-min="0" id="inp-010"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function (answers) {
                if (answers.notEmpty('question5')) {
                    if (answers.get('question5').indexOf('consultation') != -1) {
                        return 10
                    }
                }
 
                return false
            })</script>
            </td>
        </tr>
        <tr data-header="header-3">
            <td class="action">
                <span class="title">Lawyer and policy official check and proofread SI</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="0" min="0" data-min="0"/>
            <span class="validation" id="inp-011"></span>
            <!--
            <script data-unit="working-days">actionDurations.push(function (answers) {
                if (answers.notEmpty('question5')) {
                    if (answers.get('question5').indexOf('consultation') != -1) {
                        return 0
                    }
                }
 
                return false
            })</script>
            -->
 
                <script data-unit="working-days">actionDurations.push(function () {
                var answer4Map = {
                    small: 5,
                    medium: 11,
                    large: 21
                }
 
                if (answers.notEmpty('question4') && answers.notEmpty('question5'))  {
                        if (answers.get('question5').indexOf('consultation') != -1) {
                
                    var ans4 = answer4Map[answers.get('question4')];
 
                    return ans4*0.5;
                    $(".final-checking-default").attr("default", ans4*0.5);
                }
                }
                return false;
            })</script>
 
 
 
            </td>
        </tr>
        
        <tr data-header="header-3">
            <td class="action">
                <span class="title">Devolved Government</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" min="0" default="10" id="inp-035"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function () {
                if (answers.notEmpty('question5')) {
                    if (answers.get('question5').indexOf('consultation') != -1 && answers.get('question5').indexOf('Consultation with devolved government') != -1) {
                        return 10
                    }
                }               
 
                return false
            })</script>
            </td>
        </tr>

        <tr data-header="header-3">
            <!--  ** Not required for now ** -->
            <td class="action">
                <span class="title">DExEU Clearance (If EU Related)</span>
                 <span data-toggle="popover" title="DExEU clearance" data-trigger="hover"  
                    data-content="If needed." data-placement="left" class="info-button">
                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="18px" height="18px">
                </span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration locked">
                <span class="calculated hidden"></span>
                <input type="number" default="5" min="0" data-min="0" id="inp-012"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function (answers) {
                return false
            })</script>
            </td>
        </tr>
      
        <tr data-header="header-3">
            <td class="action">
                <span class="title">Policy official seeks ministerial approval to start consultation</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" min="0" data-min="1" default="5" id="inp-013"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function (answers) {
                // q7 has been entered as yes
                if (answers.notEmpty('question5')) {
                    if (answers.get('question5').indexOf('consultation') != -1) {
                        return 5
                    }
                }
 
                return false
            })</script>
            </td>
        </tr>
        <tr data-header="header-3" style="border-bottom:4px solid #333">
            <td class="action">
                <span class="title">Impact Assessment</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="30" min="0" data-min="0" id="inp-014"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function (answers) {
                // q7 has been entered as yes
                if (answers.notEmpty('question5')) {
                    if (answers.get('question5').indexOf('consultation') != -1) {
                        return 30
                    }
                }
 
                return false
            })</script>
            </td>
        </tr>
        <tr data-header="header-4" class="header-row">
            <td class="stage" rowspan="2"  valign="middle"  style="border-bottom:4px solid #333">
                <span class="title">Consult<span class="visible-mobile">-</span>ation on draft statutory instrument</span>
            </td>
 
            <td class="action">
                <span class="title">Policy official initiates and runs consultation exercise</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" min="0" data-min="10" default="60" class="si-consultation" id="inp-016"/>
            <span class="validation si-consultation-validation"></span>
            <script data-unit="working-days">actionDurations.push(function (answers) {
                // q7 has been entered as yes
                if (answers.notEmpty('question5')) {
                    if (answers.get('question5').indexOf('consultation') != -1) {
                        return $(".consultation-days input").val() || 60;
                    }
                }
 
                return false
            })</script>
            </td>
        </tr>
        <tr data-header="header-4" style="border-bottom:4px solid #333">
            <td class="action">
                <span class="title">Policy official analyses consultation responses and provides revised instructions to drafting lawyer</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="10" min="0" data-min="0" id="inp-017"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function (answers) {
                // q7 has been entered as yes
                if (answers.notEmpty('question5')) {
                    if (answers.get('question5').indexOf('consultation') != -1) {
                        return 10
                    }
                }
 
                return false
            })</script>
            </td>
        </tr>
 
        <tr data-header="header-5" class="header-row">
            <td class="stage" rowspan="2"  valign="middle"  style="border-bottom:4px solid #333">
                <span class="title">Post-consultation amendments</span>
            </td>
 
            <td class="action">
                <span class="title">Lawyer produces revised draft of SI</span>
                 <span data-toggle="popover" title="Lawyer produces revised draft of SI" data-trigger="hover"  
                    data-content="This will reflect any changes which the consultation has led to." data-placement="left" class="info-button">
                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="18px" height="18px">
                </span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="0" min="0" data-min="0" id="inp-018"/>
            <p class="validation"></p>
            <!--
            <script data-unit="working-days">actionDurations.push(function (answers) {
                // q7 has been entered as yes
                if (answers.notEmpty('question5')) {
                    if (answers.get('question5').indexOf('consultation') != -1) {
                        return 0.5;
                    }
                }
 
                return false
            })</script>
            -->
                
                <script data-unit="working-days">actionDurations.push(function () {
                var answer4Map = {
                    small: 5,
                    medium: 11,
                    large: 21
                }
 
                if (answers.notEmpty('question4') && answers.notEmpty('question5'))  {
                        if (answers.get('question5').indexOf('consultation') != -1) {
                
                    var ans4 = answer4Map[answers.get('question4')];
 
                    return ans4*0.5;
                    $(".final-checking-default").attr("default", ans4*0.5);
                }
                }
                return false;
            })</script>
 
 
            </td>
        </tr>
        <tr data-header="header-5" style="border-bottom:4px solid #333">
            <td class="action">
                <span class="title">Policy official consults informally with stakeholders and other departments</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="10" min="0" data-min="0" id="inp-019"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function (answers) {
                // q7 has been entered as yes
                if (answers.notEmpty('question5')) {
                    if (answers.get('question5').indexOf('consultation') != -1) {
                        return 10
                    }
                }
 
                return false
            })</script>
            </td>
        </tr>
 
        <tr data-header="header-6" class="header-row">
            <td class="stage" rowspan="15"  valign="middle" id="final-stage">
                <p class="title">Final approval and clear<span class="visible-mobile">-</span>ances</p>
            </td>
            <td class="action">
                <span class="title">Second lawyer checks draft SI</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="10" min="0" data-min="0" id="inp-020"/>
        
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function () {
                return 10
            })</script>
        </tr>
        <tr data-header="header-6">
            <td class="action">
                <span class="title">Lawyer seeks Parliamentary Counsel clearance</span>
                  <span data-toggle="popover" title="Parliamentary Counsel clearance" data-trigger="hover"  
                    data-content="If needed." data-placement="left" class="info-button">
                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="18px" height="18px">
                </span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="20" min="20" data-min="20" id="inp-021"/>
            <p class="validation"></p>
            <!--
            <script data-unit="working-days">actionDurations.push(function (answers) {
                
                if (answers.notEmpty('question5') || (answers.notEmpty('question2') && answers.notEmpty('question6'))) {
                    if (answers.get('question5').indexOf('consultation') != -1 ||
                        answers.get('question2') == 'affirmative' && answers.get('question6') == 'yes') {
                        return 20
                        
                    }
                }
 
                return false
            })</script>
            -->
            <script data-unit="working-days">actionDurations.push(function (answers) {
                
                if (answers.notEmpty('question6')) {
                    if (answers.get('question6') == 'yes') {
                        return 20
            
                    }
                }
 
                return false
            })</script>
        </td>
        </tr>
        <tr data-header="header-6">
            <td class="action">
 
                <span class="title">Third lawyer checks draft SI</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="10" min="0" data-min="0" id="inp-022"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function () {
                return 10
            })</script>
            </td>
        </tr>
        <tr data-header="header-6">
            <td class="action">
                <span class="title">Lawyer and policy official check and proofread SI</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="0" min="0" data-min="0" class="final-checking-default" id="inp-023"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function () {
                var answer4Map = {
                    small: 5,
                    medium: 11,
                    large: 21
                }
                if (answers.notEmpty('question4')) {
                    var ans4 = answer4Map[answers.get('question4')];
 
                    return ans4*0.5;
                    $(".final-checking-default").attr("default", ans4*0.5);
                }
                return null;
            })</script>
            </td>
        </tr>
        <tr data-header="header-6">
            <td class="action">
                <span class="title">Policy official and lawyer check guidance for the last time before publication</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="5" min="0" data-min="0" id="inp-024"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function (answers) {
                // q7 has been entered as yes
                if (answers.notEmpty('question5')) {
                    if (answers.get('question5').indexOf('guidance') != -1) {
                        return 5
                    }
                }
 
                return false
            })</script>
            </td>
        </tr>
       
        <tr data-header="header-6"> 
            <td class="action">
                <span class="title">DExEU Clearance (If EU Related)</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration locked">
                <span class="calculated hidden"></span>
                <input type="number" default="0" min="0" data-min="0" id="inp-025"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function (answers) {
                return false
            })</script>
            </td>
        </tr>
       
        <tr data-header="header-6">
            <td class="action">
                <span class="title">Policy official manages ministerial write-round seeking final Cabinet clearances</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="5" min="0" data-min="0" id="inp-026"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function () {
                return 5
            })</script>
            </td>
        </tr>
        <tr data-header="header-6">
            <td class="action">
                <span class="title">Policy official seeks ministerial approval to make SI</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" min="0" data-min="1" default="5" id="inp-027"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function () {
                return 5
            })</script>
            </td>
        </tr>
        <tr data-header="header-6">
            <td class="action">
                <span class="title">Impact Assessment</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="30" min="0" data-min="0" id="inp-029"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function () {
                if (answers.notEmpty('question5')) {
                    if (answers.get('question5').indexOf('Impact Assessment') != -1) {
                        return 30
                    }
                }
 
                return false
            })</script>
            </td>
        </tr>
        <tr data-header="header-6">
            <td class="action">
                <span class="title">Policy official leads on technical standards notification to European Commission</span>
                  <span data-toggle="popover" title="Technical Standards Notification" data-trigger="hover"  
                    data-content="Each department will have its own processes for making the notification. Ask your EU team or equivalent." data-placement="left" class="info-button">
                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="18px" height="18px">
                </span>

            </td><td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" min="0" data-min="1" default="5" id="inp-030"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function (answers) {
                // q7 has been entered as yes
                if (answers.notEmpty('question7')) {
                    if (answers.get('question7') == 'yes') {
                        return 5
                    }
                }
 
                return false
            })</script>
            </td>
        </tr>
        <tr data-header="header-6">
            <td class="action">
                <span class="title">Technical standards standstill period</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="66" min="0" data-min="0" id="inp-031"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function (answers) {
                // q7 has been entered as yes
                if (answers.notEmpty('question7')) {
                    if (answers.get('question7') == 'yes') {
                        return 66
                    }
                }
 
                return false
            })</script>
            </td>
        </tr>
        <tr data-header="header-6">
            <td class="action">
                <span class="title">Lawyer arranges SI validation</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration locked">
                <span class="calculated hidden"></span>
                <input type="number" default="2" min="0" data-min="0" id="inp-032"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function () {
                return 2
            })</script>
            </td>
        </tr>
        <tr data-header="header-6">
            <td class="action">
                <span class="title">Lawyer liaises with JCSI's lawyer to seek informal clearance on affirmative instrument</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" min="0" data-min="10" default="10" id="inp-033"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function () {
                if (answers.notEmpty('question2')) {
                    if (answers.get('question2') == 'affirmative') {
                        return 10
                    }
                }               
 
                return false;
            })</script>
            </td>
        </tr>
 
        <tr data-header="header-6">
            <td class="action">
                <span class="title">Lawyer deals with any JCSI queries in consultation with the client</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" min="0" data-min="10" default="10" id="inp-034"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function () {
                if (answers.notEmpty('question2')) {
                    if (answers.get('question2') == 'affirmative') {
                        return 10
                    }
                }               
 
                return false;
            })</script>
            </td>
        </tr>
 
        <tr data-header="header-6" style="border-bottom:4px solid #333">
            <td class="action">
                <span class="title">Policy official commissions translation of SI into Welsh</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" min="0" default="10" id="inp-037"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function () {
                if (answers.notEmpty('question5')) {
                    if (answers.get('question5').indexOf('Consultation with devolved government') != -1 && 
                        answers.get('question5').indexOf('Welsh translation') != -1) {
                        return 10
                    }
                }               
 
                return false
            })</script>
            </td>
        </tr>
 
        <tr data-header="header-7" class="affirmative-answer header-row" style="border-top:4px solid #333">
            <td class="stage" rowspan="5"  valign="middle"  style="border-bottom:4px solid #333">
                <p class="title">Parlia<span class="visible-mobile">-</span>mentary process for affirmative SIs </p>
            </td>
 
            <td class="action">
                <span class="title">Policy official puts up a submission to the minister, seeking approval to lay draft SI in Parliament</span>
                 <span data-toggle="popover" title="Final submission to minister" data-trigger="hover"  
                    data-content="Please check you do this in accordance with departmental practice." data-placement="left" class="info-button">
                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="18px" height="18px">
                </span>

            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" min="0" data-min="1" default="5" id="inp-038"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function () {
                if (answers.notEmpty('question2')) {
                    if (answers.get('question2') == 'affirmative') {
                        return 5
                    }
                }               
 
                return false
            })</script>
            </td>
        </tr>
        <tr data-header="header-7">
            <td class="action">
                <span class="title">Registration, publication, printing and laying (in readiness for JCSI meeting and Parliamentary debate).</span>
                 <span data-toggle="popover" title="SI registration" data-trigger="hover"  
                    data-content="Done in accordance with departmental practice." data-placement="left" class="info-button">
                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="18px" height="18px">
                </span>

            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration locked">
                <span class="calculated hidden"></span>
                <input type="number" default="5" min="0" data-min="0" id="inp-039"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function () {
                if (answers.notEmpty('question2')) {
                    if (answers.get('question2') == 'affirmative') {
                        return 5
                    }
                }
 
                return false
            })</script>
            </td>
        </tr>
        <tr data-header="header-7">
            <td class="action">
                <span class="title">Time for committee reports and parliamentary debates</span>
                 <span data-toggle="popover" title="Signing" data-trigger="hover"  
                    data-content="This period of time excludes any days when Parliament does not generally sit. Please check Parliament’s website for precise dates." data-placement="left" class="info-button">
                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="18px" height="18px">
                </span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration locked">
                <span class="calculated hidden"></span>
                <input type="number" default="5" min="0" data-min="0" id="inp-048"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function (answers) {
                if (answers.notEmpty('question2')) {
                    if (answers.get('question2') == 'affirmative') {
                        return 42
                    }
                }
 
                return false
            })</script>
            </td>
        </tr>
        <tr data-header="header-7">
            <td class="action">
                <span class="title">Minister signs SI</span>
                 <span data-toggle="popover" title="Signing" data-trigger="hover"  
                    data-content="Requires Parliament to have approved the draft SI." data-placement="left" class="info-button">
                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="18px" height="18px">
                </span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration locked">
                <span class="calculated hidden"></span>
                <input type="number" default="5" min="0" data-min="0" id="inp-041"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function (answers) {
                if (answers.notEmpty('question2')) {
                    if (answers.get('question2') == 'affirmative') {
                        return 5
                    }
                }
 
                return false
            })</script>
            </td>
        </tr>
        <tr data-header="header-7" style="border-bottom:4px solid #333">
            <td class="action">
                <span class="title">Post Signature Period</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" min="0" data-min="1" default="21" id="inp-042"/>
            <p class="validation"></p>
            <span class="calendar-days-text">Calendar Days</span>
            <script data-unit="calendar-days">actionDurations.push(function (answers) {
                if (answers.notEmpty('question2')) {
                    if (answers.get('question2') == 'affirmative') {
                        return 21
                    }
                }
 
                return false
            })</script>
            </td>
        </tr>
 
        <tr data-header="header-8" class="negative-answer header-row" style="border-top:4px solid #333">
            <td class="stage" rowspan="4"  valign="middle"  style="border-bottom:4px solid #333">
                <span class="title">Parliamentary process for negative SIs </span>
            </td>
 
            <td class="action">
                <span class="title">Policy official puts a submission to the minister, asking them to make/sign the SI</span>
                 <span data-toggle="popover" title="Final submission to minister" data-trigger="hover"  
                    data-content="Please check you do this in accordance with departmental practice." data-placement="left" class="info-button">
                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="18px" height="18px">
                </span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" min="0" data-min="1" default="5" id="inp-043"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function (answers) {
                if (answers.notEmpty('question2')) {
                    if (answers.get('question2') == 'negative') {
                        return 5
                    }
                }
 
                return false
            })</script>
            </td>
        </tr>
        <tr data-header="header-8">
            <td class="action">
                <span class="title">Lawyer initiates laying of draft SI in readiness for JCSI meeting and parliamentary debate</span>
                  <span data-toggle="popover" title="SI laying" data-trigger="hover"  
                    data-content="Done in accordance with departmental practice." data-placement="left" class="info-button">
                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="18px" height="18px">
                </span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="30" min="0" data-min="0" id="inp-040"/>
                <p class="validation"></p>
                <script data-unit="working-days">actionDurations.push(function (answers) {
                    if (answers.notEmpty('question2')) {
                        if (answers.get('question2') == 'negative') {
                            return 30
                        }
                    }
     
                    return false
                })</script>
            </td>
        </tr>
        <tr data-header="header-8">
            <td class="action">
                <span class="title">SI registration, publication, printing and laying</span>
                <span data-toggle="popover" title="SI registration" data-trigger="hover"  
                    data-content="Done in accordance with departmental practice." data-placement="left" class="info-button">
                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="18px" height="18px">
                </span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration locked">
                <span class="calculated hidden"></span>
                <input type="number" default="5" min="0" data-min="0" id="inp-044"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function (answers) {
                if (answers.notEmpty('question2')) {
                    if (answers.get('question2') == 'negative') {
                        return 5
                    }
                }
 
                return false
            })</script>
            </td>
        </tr>
        <tr data-header="header-8" style="border-bottom:4px solid #333">
            <td class="action">
                <span class="title">Period before SI comes into force</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration locked">
                <span class="calculated hidden"></span>
                <input type="number" default="21" min="0" data-min="0" id="inp-045"/>
            <p class="validation"></p>
            <span class="calendar-days-text">Calendar days</span>
            <script data-unit="working-days">actionDurations.push(function (answers) {
                if (answers.notEmpty('question2')) {
                    if (answers.get('question2') == 'negative') {
                        return 21
                    }
                }
 
                return false
            })</script>
            </td>
        </tr>
 
        <tr data-header="header-9" class="header-row" style="border-top:4px solid #333">
            <td class="stage" rowspan="4"  valign="middle"  style="border-bottom:4px solid #333">
                <span class="title">Process and signature for SIs with no parliamentary procedure</span>
            </td>
            <td class="action">
                <span class="title">Policy official puts up a submission to the minister, asking them to make/sign the SI</span>
                 <span data-toggle="popover" title="Final submission to minister" data-trigger="hover"  
                    data-content="Please check you do this in accordance with departmental practice." data-placement="left" class="info-button">
                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="18px" height="18px">
                </span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" min="0" data-min="1" default="5" id="inp-046"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function (answers) {
                if (answers.notEmpty('question2')) {
                    if (answers.get('question2') == 'no') {
                        return 5
                    }
                }
 
                return false
            })</script>
            </td>
        </tr>
        <tr data-header="header-9">
            <td class="action">
                <span class="title">Lawyer initiates laying of draft SI in readiness for JCSI meeting and parliamentary debate</span>
                  <span data-toggle="popover" title="SI laying" data-trigger="hover"  
                    data-content="Done in accordance with departmental practice." data-placement="left" class="info-button">
                    More info    <img id="u3110_img" class="img  info-img" src="https://image.ibb.co/csOfvm/u1082.png" width="18px" height="18px">
                </span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" default="30" min="0" data-min="0" id="inp-050"/>
            <p class="validation"></p>
            <script data-unit="working-days">actionDurations.push(function (answers) {
                if (answers.notEmpty('question2')) {
                    if (answers.get('question2') == 'no') {
                        return 30
                    }
                }
 
                return false
            })</script>
            </td>
        </tr>
        <tr data-header="header-9">
            <td class="action">
                <span class="title">Registration and publication of instrument</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" min="0" data-min="0" default="5" id="inp-049"/>
            <p class="validation"></p>
            <script data-unit="calendar-days">actionDurations.push(function (answers) {
                if (answers.notEmpty('question2')) {
                    if (answers.get('question2') == 'no') {
                        return 5
                    }
                }
 
                return false
            })</script>
            </td>
        </tr>
        <tr data-header="header-9" style="border-bottom:4px solid #333">
            <td class="action">
                <span class="title">Period between making of SI and commencement date</span>
            </td>
            <td class="start-date"></td>
            <td class="end-date end-date-cell"></td>
            <td class="duration">
                <span class="calculated hidden"></span>
                <input type="number" min="0" data-min="1" default="21" id="inp-047"/>
            <p class="validation"></p>
            <span class="calendar-days-text">Calendar Days</span>
            <script data-unit="calendar-days">actionDurations.push(function (answers) {
                if (answers.notEmpty('question2')) {
                    if (answers.get('question2') == 'no') {
                        return 21
                    }
                }
 
                return false
            })</script>
            </td>
        </tr>
    </tbody>
</table>    
        <div class="prt-btn-wrapper form-inline" data-print='false'>
            <label class="save-label hidden">Enter a name for your SI Timetable</label>             
            <input class="form-control save-input hidden"/>             
            <label class="save-message hidden">Your SI timetable has been now saved.</label>                
            <button class="print prt-btn" id="print-table" style="width:46%">Print</button>             
            <button class="save prt-guide-btn" id="print-guide-table"  style="width:46%">Save as a PDF</button> 
            <button class="save prt-guide-btn hidden" id="export-table"  style="width:46%; margin-right: 12px;">Save data</button>
            <button type="button" class="save prt-guide-btn hidden" id="load-data" style="width:46%">Load Data</button> 
            <button class="cancel-save save-btn white-btn hidden" id="cancel-save-table">Cancel</button>                
            <button class="back-table save-btn white-btn hidden" id="back-table">Go back to SI Table</button>  
                            
        </div>                     
                        </div>
                    </section>
                </div>
            </div>
        </div> 
    </div>
    <input type="hidden" id="r1">
    <input type="hidden" id="r2">
    <input type="hidden" id="r3">
    <input type="hidden" id="r4">
    <input type="hidden" id="r5">
    <input type="hidden" id="r6">
    <input type="hidden" id="r6b">
    <input type="hidden" id="r7">
    <input type="hidden" id="r8">

    <div id="save-table-modal" class="modal" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Help!</h4>
                </div>
                <div class="modal-body">
                    <p>
                        If you would like to save a copy of this timetable to your computer, click print and choose 'Save as PDF' where you are asked to select  a printer.
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div id="miss-step-modal" class="modal" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Selection Required</h4>
                </div>
                <div class="modal-body">
                    <p>
                        Questions <span class="miss-steps"></span> have not been answered.
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div id="miss-answer-modal" class="modal" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"  style="font-size:1.7em;">Selection Required</h4>
                </div>
                <div class="modal-body">
                    <p style="font-size:1.4em;">
                        You need to answer this question to proceed.
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div id="miss-previous-modal" class="modal" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Error!</h4>
                </div>
                <div class="modal-body">
                    <p>
                        You need to answer a question before this question.
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div id="print-guide-modal" class="modal" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title"  style="font-size:1.7em;">How to save your SI table to a PDF file</h4>
                </div>
                <div class="modal-body">
                    <p style="font-size:1.4em;">
                        1) Hold 'ctrl' and 'p' (after you close this pop-up)
                    </p>
                    <p style="font-size:1.4em;">
                        2) A dialog will appear,  click on the button 'change' and select 'Save as PDF' 
                    </p>
                    <p style="font-size:1.4em;">
                        3) Click on the button 'Save' 
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Include jQuery -->
    <!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>-->

    <!-- Include SmartWizard JavaScript source -->
   
<script type="text/javascript" src="<?php echo SI_PLUGIN_URL ?>js/si/jquery.smartWizard.js"></script>
<script type="text/javascript" src="<?php echo SI_PLUGIN_URL ?>js/si/FileSaver.js"></script>
<link rel="stylesheet" href="<?php echo SI_PLUGIN_URL ?>css/si/jquery-ui.css">
<script type="text/javascript" src="<?php echo SI_PLUGIN_URL ?>js/si/jquery-ui.js"></script>
<script type="text/javascript" src="<?php echo SI_PLUGIN_URL ?>js/si/date-subtractor.js"></script>
<script type="text/javascript" src="<?php echo SI_PLUGIN_URL ?>js/si/pdf-make.js"></script>
<script type="text/javascript" src="<?php echo SI_PLUGIN_URL ?>js/si/front.js"></script>

	       
    	<link href="<?php echo SI_PLUGIN_URL ?>css/si/smart_wizard.css" rel="stylesheet" type="text/css"/>
        <link href="<?php echo SI_PLUGIN_URL ?>css/si/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    	<link href="<?php echo SI_PLUGIN_URL ?>css/si/dots.css" rel="stylesheet" type="text/css" />
    	<link href="<?php echo SI_PLUGIN_URL ?>css/si/print.css" rel="stylesheet" type="text/css" />


    <?php
    exit;
    }
}


add_shortcode('SI_tool', 'ksm_SI_tool');
function ksm_SI_tool()
{
    ob_start();
?>
<iframe src="<?php bloginfo('url') ?>/?show=SI_tool" width="100%" style="border: 0px;overflow: hidden;
scroll-behavior: unset;" onload="resizeIframe(this)" scrolling="no"></iframe>
<script>
  function resizeIframe(obj) {
    setInterval(function(){
        obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
    }, 500);
  }
</script>
<?php 
$return = ob_get_contents();
ob_end_clean();

return $return;
} ?>
	
    	
        