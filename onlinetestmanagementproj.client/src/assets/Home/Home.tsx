import './Home.css';
import 'bootstrap'
function Home() {
    return (
        <div className="container">
            <div className="container-1">
                <h3 className="wel">Welcome!!!</h3>
                <p className="content lead">
                    Our Online Test Management platform offers a diverse range of assessment formats, personalized dashboards for students, and intuitive tools for educators to craft, administer, and monitor tests with ease. With robust assessment and feedback mechanisms, we foster continuous improvement and academic excellence
                    while prioritizing security and privacy. Join us for a seamless educational journey, featuring flexible
                    subscription plans and collaborative features to enhance learning.
                </p>
                <div className="images">
                    <img src="https://cdn.edclass.com/wp-content/uploads/online-exams.jpg" width="400px" height="300px">
                    </img>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIc4HKLPb9hCCvl4uQ4QTY6qsXBVmC7HCrjm0_GQB3hw&s" width="400px" height="300px">
                    </img>
                    <img src="https://m.economictimes.com/thumb/msid-80833752,width-1200,height-900,resizemode-4,imgsize-64431/online-test-gettyimages.jpg" width="400px" height="300px">
                    </img>

                </div>

               {/* <div className="content">
                    */}{/*<h2>Tests Can be taken..</h2>*/}{/*
                    <ul>
                      */}{/*  <li>MCQs</li>
                        <li>Essay Type</li>*/}{/*
                        <li>CODING</li>
                    </ul></div>*/}

            </div>
        </div>
    );
}
export default Home;