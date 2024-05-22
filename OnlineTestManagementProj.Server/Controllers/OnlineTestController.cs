using System;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using Common.Models;
using ServiceLayer.ServiceLayer;
using System.Configuration;

namespace OnlineTestManagementProj.Server.Controllers
{
    /*[ApiController]
    [Route("OnlineTest")]*/
    public class OnlineTestController : Controller
    {
        [HttpPost]
        [Route("compile/cpp")]
        public async Task<IActionResult> CompileCode([FromBody] CompileRequest request)
        {
            // Define a unique filename for the C++ source file
            var fileName = $"{Guid.NewGuid()}.cpp";

            // Define filename for the executable
            var exeFileName = Path.Combine(Path.GetTempPath(), $"{Guid.NewGuid()}.exe");

            // Define filename for the output
            var outputFileName = Path.Combine(Path.GetTempPath(), $"{Guid.NewGuid()}.txt");

            // Write the C++ code to a temporary file
            var filePath = Path.Combine(Path.GetTempPath(), fileName);
            await System.IO.File.WriteAllTextAsync(filePath, request.Code);
            Console.WriteLine(request.Input);

            try
            {
                // Set the path to the g++ compiler executable
                var compilerPath = @"C:\Program Files (x86)\Dev-Cpp\MinGW64\bin\g++.exe";

                // Set the arguments for the compiler
                var arguments = $"-o \"{exeFileName}\" \"{filePath}\"";

                // Invoke the C++ compiler as an external process
                using (var process = new Process
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = compilerPath,
                        Arguments = arguments,
                        RedirectStandardOutput = true,
                        RedirectStandardError = true,
                        UseShellExecute = false,
                        CreateNoWindow = true
                    }
                })
                {
                    process.Start();
                    process.WaitForExit();

                    // Read the compiler output
                    var error = await process.StandardError.ReadToEndAsync();

                    if (!string.IsNullOrEmpty(error))
                    {
                        // Compilation failed
                        return Ok(new CompileResponse { Output = error });
                    }
                }

                // Invoke the compiled executable as an external process
                using (var process = new Process
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = exeFileName,
                        RedirectStandardInput = true,
                        RedirectStandardOutput = true,
                        RedirectStandardError = true,
                        UseShellExecute = false,
                        CreateNoWindow = true
                    }
                })
                {
                    process.Start();

                    // Write the input to the standard input stream
                    await process.StandardInput.WriteLineAsync(request.Input);
                    await process.StandardInput.FlushAsync();


                    // Wait for the process to finish
                    await process.WaitForExitAsync();

                    // Read the contents of the standard output stream
                    var output = await process.StandardOutput.ReadToEndAsync();
                    Console.WriteLine(output);

                    // Write the output to the output file
                    await System.IO.File.WriteAllTextAsync(outputFileName, output);

                    // You can also print the output to the console if needed
                    Console.WriteLine("Output: " + output);
                }

                // Read the contents of the output file
                var outputText = await System.IO.File.ReadAllTextAsync(outputFileName);

                // Return the output contents as a string
                return Ok(new CompileResponse { Output = outputText });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                // Handle any exceptions that occur during compilation or execution
                return StatusCode(500, new CompileResponse { Output = $"Error occurred: {ex.Message}" });
            }
            finally
            {
                // Cleanup: delete the temporary files
                try
                {
                    System.IO.File.Delete(filePath);
                    System.IO.File.Delete(exeFileName);
                    System.IO.File.Delete(outputFileName);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error during cleanup: " + ex.Message);
                }
            }
        }

       
        [HttpPost]
        [Route("compile/python")]
        public async Task<IActionResult> CompilePythonCode([FromBody] CompileRequest request)
        {
            var fileName = $"{Guid.NewGuid()}.py";
            var outputFileName = Path.Combine(Path.GetTempPath(), $"{Guid.NewGuid()}.txt");
            var filePath = Path.Combine(Path.GetTempPath(), fileName);
            await System.IO.File.WriteAllTextAsync(filePath, request.Code);

            try
            {
                var pythonPath = @"C:\Users\srich_pjup6ou\AppData\Local\Programs\Python\Python311\pythonw.exe";
                var arguments = $"\"{filePath}\"";

                using (var process = new Process
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = pythonPath,
                        Arguments = arguments,
                        RedirectStandardInput = true,
                        RedirectStandardOutput = true,
                        RedirectStandardError = true,
                        UseShellExecute = false,
                        CreateNoWindow = true
                    }
                })
                {
                    process.Start();

                    // Pass input to the Python process
                    await process.StandardInput.WriteLineAsync(request.Input);
                    await process.StandardInput.FlushAsync();

                    process.WaitForExit();

                    var output = await process.StandardOutput.ReadToEndAsync();
                    var error = await process.StandardError.ReadToEndAsync();

                    if (!string.IsNullOrEmpty(error))
                    {
                        return Ok(new CompileResponse { Output = error });
                    }

                    await System.IO.File.WriteAllTextAsync(outputFileName, output);
                }

                var outputText = await System.IO.File.ReadAllTextAsync(outputFileName);
                return Ok(new CompileResponse { Output = outputText });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return StatusCode(500, new CompileResponse { Output = $"Error occurred: {ex.Message}" });
            }
            finally
            {
                try
                {
                    System.IO.File.Delete(filePath);
                    System.IO.File.Delete(outputFileName);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error during cleanup: " + ex.Message);
                }
            }
        }

       /* private readonly IOnlineTestService _onlineTestService;

      

        public OnlineTestController(IOnlineTestService onlineTestService)
        {
            _onlineTestService = onlineTestService;
        }

       


        [HttpPost("posttodo")]
       
        public async Task<IActionResult> PostToDo([FromBody] ToDo obj)
        {
            if(obj==null) {
                return BadRequest("ToDo object is null");
            }

            try {
                await _onlineTestService.PostToDo(obj);
                return Ok("ToDo item added successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }


        }*/


    }

    public class CompileRequest
    {
        public string Code { get; set; }
        public string Input { get; set; }
    }

    public class CompileResponse
    {
        public string Output { get; set; }
    }

   
}




