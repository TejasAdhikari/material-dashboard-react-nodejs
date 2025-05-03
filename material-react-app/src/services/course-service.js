import HttpService from './htttp.service';

// This service is responsible for handling all course-related API calls
class CourseService {
    // Fetch all courses from the server
    getAllCourses = async () => {
        const response = await HttpService.get('courses');
        return response;
    };

    // Fetch a single course by its ID
    getCourseById = async (id) => {
        const response = await HttpService.get(`courses/${id}`);
        return response;
    };

    // Unlock a specific module in a course by its order number
    unlockModule = async (courseId, moduleOrder) => {
        const response = await HttpService.post(`courses/${courseId}/modules/${moduleOrder}/unlock`);
        return response;
    };
}

export default new CourseService();