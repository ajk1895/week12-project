//array to hold objects created by user

let bandObjs = [

];

//startup
$(()=> {
    renderBandObjs();
});

//display the objects
const $bandHolder = $("#band-holder");

function renderBandObjs() {
    $bandHolder.empty();
    $bandHolder.append(bandObjs.map(band => renderBand(band)));
};

//way to create new objects
function renderBand(band){
    return $("<div/>").addClass("card m-3").append(
        $("<div/>").addClass("card-body bg-dark").append(
            $("<h5/>").addClass("card-title").text(band.name),
            $("<p/>").addClass("card-text").text(band.members),
            $("<button>").addClass("btn btn-warning me-2").text("Edit").on("click", () => onEditBand(band.id)),
            $("<button/>").addClass("btn btn-danger ").text("Delete").on("click", () => onClickDelete(band.id))
        )
    )
};

const bandModal = new bootstrap.Modal('#band-modal');
const $bandModalTitle = $("#band-modal-title");
const $nameInput = $("#name-input");
const $membersInput =$("#members-input");

let editId = null;

function onCreateBand(){
    bandModal.show();
    $bandModalTitle.text("New Band");
    $nameInput.val("");
    $membersInput.val("");
    editId = null;
};

//way to edit existing objects
function onEditBand(bandId) {
    const band = bandObjs.find(band => band.id === bandId);
    bandModal.show();
    $bandModalTitle.text("Edit Band: " + band.name);
    $nameInput.val(band.name);
    $membersInput.val(band.members);
    editId = band.id;
};

function onSave() {
    
    if (editId === null){
        bandObjs.push({
            id: bandObjs.length,
            name: $nameInput.val(),
            members: $membersInput.val()
        })
    }
    else{
        const band = bandObjs.find(band => band.id === editId);
        band.name = $nameInput.val();
        band.members = $membersInput.val();
    }
    renderBandObjs();
    bandModal.hide();
};

//way to delete objects
function onClickDelete(bandId) {
    const deleteObj = bandObjs.findIndex(band => band.id === bandId);
    bandObjs.splice(deleteObj, 1);
    renderBandObjs();
};