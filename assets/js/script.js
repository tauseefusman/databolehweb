// Theme Toggle Function
const themeToggle = document.getElementById('themeToggle');
const moonIcon = themeToggle.querySelector('.fa-moon');
const sunIcon = themeToggle.querySelector('.fa-sun');
const htmlElement = document.documentElement;

// Check for saved theme preference or respect OS preference
function getThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Apply theme
function applyTheme(theme) {
    if (theme === 'dark') {
        htmlElement.classList.add('dark');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        htmlElement.classList.remove('dark');
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }
}

// Initialize theme
const currentTheme = getThemePreference();
applyTheme(currentTheme);

// Toggle theme when button is clicked
themeToggle.addEventListener('click', () => {
    const newTheme = htmlElement.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Scroll to section when clicking on navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.padding = '10px 0';
        header.style.boxShadow = 'var(--shadow)';
    } else {
        header.style.padding = '15px 0';
        header.style.boxShadow = 'var(--shadow)';
    }
});

// Services Tab Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        tabBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Hide all tab panes
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Show the corresponding tab pane
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Form submission handling without CAPTCHA
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !phone || !message) {
            showFormMessage('Please fill in all fields', true);
            return;
        }
        
        // In a real application, you would send the form data to a server here
        showFormMessage('Thank you for your message! We will get back to you soon.', false);
        
        // Reset form
        contactForm.reset();
    });
}

function showFormMessage(message, isError) {
    const formMessage = document.querySelector('.captcha-message') || document.createElement('div');
    if (!document.querySelector('.captcha-message')) {
        formMessage.className = 'captcha-message';
        contactForm.appendChild(formMessage);
    }
    
    formMessage.textContent = message;
    formMessage.style.color = isError ? 'red' : 'green';
    
    // Clear message after 5 seconds if it's a success message
    if (!isError) {
        setTimeout(() => {
            formMessage.textContent = '';
        }, 5000);
    }
}

// WhatsApp Chat Button Animation
const whatsappButton = document.querySelector('.whatsapp-button');
if (whatsappButton) {
    // Add a subtle bouncing animation to draw attention
    setTimeout(() => {
        whatsappButton.style.animation = 'bounce 2s infinite';
    }, 3000);
}

// Add bounce animation to CSS
const style = document.createElement('style');
style.textContent = `
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
    40% {transform: translateY(-10px);}
    60% {transform: translateY(-5px);}
}`;
document.head.appendChild(style);

// Initialize animation on load
window.addEventListener('DOMContentLoaded', () => {
    // Add subtle animations for page elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .tab-content-inner, .workflow-step, .portfolio-item, .testimonial-item, .about-stats, .contact-form, .contact-info');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial setup for animation elements
    const elementsToAnimate = document.querySelectorAll('.service-card, .tab-content-inner, .workflow-step, .portfolio-item, .testimonial-item, .about-stats, .contact-form, .contact-info');
    elementsToAnimate.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Call animation function on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Call once on load
    animateOnScroll();
    
    // Initialize dashboard features tooltip functionality
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            this.style.backgroundColor = 'var(--primary-color)';
            this.style.color = 'white';
        });
        
        item.addEventListener('mouseout', function() {
            this.style.backgroundColor = 'var(--light-bg)';
            this.style.color = 'var(--text-color)';
        });
    });
    
    // Initialize the pie chart for data insights
    initDataInsightsPieChart();
});

// Pie Chart Implementation for Data Insights
function initDataInsightsPieChart() {
    const ctx = document.getElementById('insightsPieChart');
    
    if (!ctx) return;
    
    // Data for the pie chart
    const data = {
        labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Others'],
        datasets: [{
            data: [35, 25, 20, 15, 5],
            backgroundColor: [
                '#7c3aed', // Product A - primary purple
                '#3b82f6', // Product B - blue
                '#10b981', // Product C - green
                '#f59e0b', // Product D - amber
                '#6b7280'  // Others - gray
            ],
            borderWidth: 2,
            borderColor: isDarkTheme() ? '#1f2937' : '#ffffff',
            hoverOffset: 15,
            hoverBorderWidth: 3,
            hoverBorderColor: isDarkTheme() ? '#374151' : '#f9fafb',
            borderRadius: 5,
            spacing: 5
        }]
    };
    
    // Chart configuration
    const config = {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '30%', // Makes it a slight donut chart for modern look
            layout: {
                padding: 20
            },
            plugins: {
                legend: {
                    display: false // We have our own custom legend
                },
                tooltip: {
                    backgroundColor: isDarkTheme() ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                    titleColor: isDarkTheme() ? '#e5e7eb' : '#333',
                    bodyColor: isDarkTheme() ? '#e5e7eb' : '#333',
                    bodyFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    boxWidth: 10,
                    boxHeight: 10,
                    boxPadding: 3,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        },
                        title: function(context) {
                            return `Product Distribution`;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    };
    
    // Create the pie chart
    const pieChart = new Chart(ctx, config);
    
    // Make legend items interactive
    const legendItems = document.querySelectorAll('.chart-legend .legend-item');
    legendItems.forEach((item, index) => {
        // Show percentage in legend
        const percentElement = item.querySelector('.legend-percent') || document.createElement('span');
        if (!item.querySelector('.legend-percent')) {
            percentElement.className = 'legend-percent';
            item.querySelector('.legend-text').appendChild(percentElement);
        }
        percentElement.textContent = `${data.datasets[0].data[index]}%`;
        
        // Highlight slice on legend hover
        item.addEventListener('mouseover', () => {
            pieChart.setActiveElements([{datasetIndex: 0, index: index}]);
            pieChart.update();
        });
        
        // Reset highlighting
        item.addEventListener('mouseout', () => {
            pieChart.setActiveElements([]);
            pieChart.update();
        });
        
        // Toggle visibility on click
        item.addEventListener('click', () => {
            const meta = pieChart.getDatasetMeta(0);
            const isHidden = meta.data[index].hidden || false;
            meta.data[index].hidden = !isHidden;
            
            // Visual feedback on legend item
            if (meta.data[index].hidden) {
                item.classList.add('inactive');
            } else {
                item.classList.remove('inactive');
            }
            
            pieChart.update();
        });
    });
    
    // Adjust chart colors on theme change
    document.getElementById('themeToggle')?.addEventListener('click', function() {
        // Update colors based on new theme
        setTimeout(() => {
            pieChart.data.datasets[0].borderColor = isDarkTheme() ? '#1f2937' : '#ffffff';
            pieChart.data.datasets[0].hoverBorderColor = isDarkTheme() ? '#374151' : '#f9fafb';
            
            // Update tooltip colors
            pieChart.options.plugins.tooltip.backgroundColor = isDarkTheme() ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)';
            pieChart.options.plugins.tooltip.titleColor = isDarkTheme() ? '#e5e7eb' : '#333';
            pieChart.options.plugins.tooltip.bodyColor = isDarkTheme() ? '#e5e7eb' : '#333';
            
            pieChart.update();
        }, 300); // Small delay to ensure theme has changed
    });
    
    // Add chart interaction animations
    ctx.addEventListener('mousemove', (e) => {
        const activePoints = pieChart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false);
        document.body.style.cursor = activePoints.length ? 'pointer' : '';
    });
    
    // Add animation toggle button functionality
    const animateButton = document.querySelector('.animate-chart-btn');
    if (animateButton) {
        animateButton.addEventListener('click', () => {
            const chartWrapper = document.querySelector('.pie-chart-wrapper');
            chartWrapper.classList.toggle('chart-animation');
            
            if (chartWrapper.classList.contains('chart-animation')) {
                animateButton.innerHTML = '<i class="fas fa-pause"></i> Pause Animation';
            } else {
                animateButton.innerHTML = '<i class="fas fa-play"></i> Animate Chart';
            }
        });
    }
    
    // Toggle raw data visibility
    const rawDataButton = document.querySelector('.raw-data-btn');
    const rawDataSection = document.querySelector('.raw-data');
    if (rawDataButton && rawDataSection) {
        // Populate raw data
        const rawDataCode = rawDataSection.querySelector('code');
        if (rawDataCode) {
            rawDataCode.textContent = data.labels.map((label, index) => {
                return `${label}: ${data.datasets[0].data[index]}%`;
            }).join('\n');
        }
        
        rawDataButton.addEventListener('click', () => {
            rawDataSection.classList.toggle('active');
            if (rawDataSection.classList.contains('active')) {
                rawDataButton.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Data';
            } else {
                rawDataButton.innerHTML = '<i class="fas fa-eye"></i> View Data';
            }
        });
    }
    
    // Update chart on window resize
    window.addEventListener('resize', () => {
        pieChart.resize();
    });
    
    return pieChart;
}

// Helper function to check if dark theme is active
function isDarkTheme() {
    return document.documentElement.classList.contains('dark');
}

// Add a function to create chart animations
function addChartAnimation(chart, index) {
    if (!chart) return;
    
    chart.setActiveElements([{datasetIndex: 0, index: index}]);
    chart.update();
            
    setTimeout(() => {
        chart.setActiveElements([]);
        chart.update();
        
        // Continue animation with next segment
        const nextIndex = (index + 1) % chart.data.labels.length;
        setTimeout(() => {
            addChartAnimation(chart, nextIndex);
        }, 3000);
    }, 1000);
}

// Initialize global chart variable to access it later
let insightsPieChart;

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the pie chart
    insightsPieChart = initDataInsightsPieChart();
    
    // Start animation cycle after a delay
    setTimeout(() => {
        if (insightsPieChart) {
            addChartAnimation(insightsPieChart, 0);
        }
    }, 3000);
});

// Data Insights Section - Enhanced functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the data insights section interactions
    initDataInsightsSection();
});

function initDataInsightsSection() {
    // Show animation for elements when they come into view
    const animateOnScroll = () => {
        const chartWrapper = document.querySelector('.pie-chart-wrapper');
        const metricCards = document.querySelectorAll('.metric-card');
        
        if (chartWrapper) {
            const chartPosition = chartWrapper.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (chartPosition < windowHeight - 100) {
                chartWrapper.classList.add('animate');
            }
        }
        
        metricCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardPosition < windowHeight - 100) {
                card.classList.add('animate');
            }
        });
    };
    
    // Call animation function on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Call once on load to check initial positions
    setTimeout(animateOnScroll, 300);
    
    // Raw data toggle functionality
    const rawDataBtn = document.querySelector('.raw-data-btn');
    const rawData = document.querySelector('.raw-data');
    
    if (rawDataBtn && rawData) {
        rawDataBtn.addEventListener('click', function() {
            rawData.classList.toggle('active');
            if (rawData.classList.contains('active')) {
                rawDataBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Raw Data';
            } else {
                rawDataBtn.innerHTML = '<i class="fas fa-eye"></i> View Raw Data';
            }
        });
    }
    
    // Chart animation toggle
    const animateChartBtn = document.querySelector('.animate-chart-btn');
    const pieChartWrapper = document.querySelector('.pie-chart-wrapper');
    
    if (animateChartBtn && pieChartWrapper) {
        animateChartBtn.addEventListener('click', function() {
            pieChartWrapper.classList.toggle('chart-animation');
            if (pieChartWrapper.classList.contains('chart-animation')) {
                animateChartBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Animation';
            } else {
                animateChartBtn.innerHTML = '<i class="fas fa-play"></i> Animate Chart';
            }
        });
    }
    
    // Set up the chart with Chart.js if the canvas exists
    const chartCanvas = document.getElementById('insightsPieChart');
    if (chartCanvas) {
        // Enable animation for legend items
        const legendItems = document.querySelectorAll('.legend-item');
        let pieChart = null;
        
        // Initialize the chart
        pieChart = initInsightsPieChart();
        
        // Make legend items interactive
        if (pieChart) {
            legendItems.forEach((item, index) => {
                item.addEventListener('mouseover', () => {
                    pieChart.setActiveElements([{datasetIndex: 0, index: index}]);
                    pieChart.update();
                });
                
                item.addEventListener('mouseout', () => {
                    pieChart.setActiveElements([]);
                    pieChart.update();
                });
                
                item.addEventListener('click', () => {
                    const meta = pieChart.getDatasetMeta(0);
                    const isHidden = meta.data[index].hidden || false;
                    meta.data[index].hidden = !isHidden;
                    
                    if (meta.data[index].hidden) {
                        item.classList.add('inactive');
                    } else {
                        item.classList.remove('inactive');
                    }
                    
                    pieChart.update();
                });
            });
        }
    }
}

// Initialize the pie chart
function initInsightsPieChart() {
    const canvas = document.getElementById('insightsPieChart');
    if (!canvas) return null;
    
    const isDarkTheme = document.documentElement.classList.contains('dark');
    
    // Data for the pie chart
    const data = {
        labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Others'],
        datasets: [{
            data: [35, 25, 20, 15, 5],
            backgroundColor: [
                '#7c3aed', // Purple - Product A
                '#3b82f6', // Blue - Product B
                '#10b981', // Green - Product C
                '#f59e0b', // Amber - Product D
                '#6b7280'  // Gray - Others
            ],
            borderColor: isDarkTheme ? '#1f2937' : '#ffffff',
            borderWidth: 2,
            hoverOffset: 15,
            hoverBorderWidth: 3,
            cutout: '30%', // Makes it a slight donut chart for a modern look
            spacing: 5,
            borderRadius: 5
        }]
    };
    
    // Chart configuration
    const config = {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: 20
            },
            plugins: {
                legend: {
                    display: false // We're using our custom legend
                },
                tooltip: {
                    backgroundColor: isDarkTheme ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                    titleColor: isDarkTheme ? '#e5e7eb' : '#333',
                    bodyColor: isDarkTheme ? '#e5e7eb' : '#333',
                    bodyFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        },
                        title: function(context) {
                            return `Product Distribution`;
                        }
                    }
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    };
    
    // Create the chart
    return new Chart(canvas, config);
}

// Update chart colors when theme changes
document.getElementById('themeToggle').addEventListener('click', function() {
    // Get the chart instance
    const chartInstance = Chart.getChart('insightsPieChart');
    if (!chartInstance) return;
    
    // Short delay to wait for theme change to complete
    setTimeout(() => {
        const isDarkTheme = document.documentElement.classList.contains('dark');
        
        // Update chart colors for dark/light mode
        chartInstance.data.datasets[0].borderColor = isDarkTheme ? '#1f2937' : '#ffffff';
        chartInstance.options.plugins.tooltip.backgroundColor = isDarkTheme ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)';
        chartInstance.options.plugins.tooltip.titleColor = isDarkTheme ? '#e5e7eb' : '#333';
        chartInstance.options.plugins.tooltip.bodyColor = isDarkTheme ? '#e5e7eb' : '#333';
        
        // Update the chart
        chartInstance.update();
    }, 300);
});

// Data Insights Section - New 2025 Implementation
document.addEventListener('DOMContentLoaded', function() {
    initDataInsightsTabs();
    initDataInsightsCharts();
});

// Initialize tabs functionality
function initDataInsightsTabs() {
    const tabButtons = document.querySelectorAll('.insight-tab');
    const tabPanels = document.querySelectorAll('.insights-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            
            // Deactivate all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Activate the clicked tab
            button.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// Initialize all chart visualizations
function initDataInsightsCharts() {
    // Initialize Revenue Pie Chart
    initRevenuePieChart();
    
    // Initialize Sales Growth Chart
    initSalesGrowthChart();
    
    // Initialize Purchase Frequency Chart
    initPurchaseFrequencyChart();
    
    // Initialize Customer Segment Chart
    initCustomerSegmentChart();
    
    // Initialize Sector Growth Chart
    initSectorGrowthChart();
    
    // Initialize Forecast Charts
    initForecastCharts();
    
    // Initialize Chart Controls
    initChartControls();
}

// Revenue Distribution Pie Chart
function initRevenuePieChart() {
    const ctx = document.getElementById('revenuePieChart');
    if (!ctx) return;
    
    const isDark = document.documentElement.classList.contains('dark');
    
    const data = {
        labels: ['Sales', 'Marketing', 'Operations', 'R&D'],
        datasets: [{
            data: [45, 25, 20, 10],
            backgroundColor: [
                '#7c3aed', // Purple - Sales
                '#3b82f6', // Blue - Marketing
                '#10b981', // Green - Operations
                '#f59e0b'  // Amber - R&D
            ],
            borderColor: isDark ? '#1f2937' : '#ffffff',
            borderWidth: 2,
            hoverOffset: 15,
            cutout: '30%'
        }]
    };
    
    const config = {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: isDark ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                    titleColor: isDark ? '#e5e7eb' : '#333',
                    bodyColor: isDark ? '#e5e7eb' : '#333',
                    bodyFont: {
                        size: 14
                    },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true
                }
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    };
    
    const pieChart = new Chart(ctx, config);
    
    // Make legend items interactive
    const legendItems = document.querySelectorAll('#revenueLegend .legend-item');
    legendItems.forEach((item, index) => {
        item.addEventListener('mouseover', () => {
            pieChart.setActiveElements([{datasetIndex: 0, index: index}]);
            pieChart.update();
        });
        
        item.addEventListener('mouseout', () => {
            pieChart.setActiveElements([]);
            pieChart.update();
        });
        
        item.addEventListener('click', () => {
            const meta = pieChart.getDatasetMeta(0);
            meta.data[index].hidden = !meta.data[index].hidden;
            pieChart.update();
            
            // Visual feedback
            if (meta.data[index].hidden) {
                item.classList.add('inactive');
            } else {
                item.classList.remove('inactive');
            }
        });
    });
    
    return pieChart;
}

// Sales Growth Line/Bar Chart
function initSalesGrowthChart() {
    const ctx = document.getElementById('salesGrowthChart');
    if (!ctx) return;
    
    const isDark = document.documentElement.classList.contains('dark');
    
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Revenue',
            data: [120, 150, 180, 170, 160, 190, 210, 230, 240, 250, 270, 280],
            borderColor: '#7c3aed',
            backgroundColor: 'rgba(124, 58, 237, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true
        }]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: isDark ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                    titleColor: isDark ? '#e5e7eb' : '#333',
                    bodyColor: isDark ? '#e5e7eb' : '#333',
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `Revenue: $${context.raw}K`;
                        }
                    }
                }
            }
        }
    };
    
    const growthChart = new Chart(ctx, config);
    
    // Handle chart type toggle
    const viewToggles = document.querySelectorAll('.view-toggle');
    if (viewToggles.length) {
        viewToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const view = toggle.getAttribute('data-view');
                
                // Update active state
                viewToggles.forEach(btn => btn.classList.remove('active'));
                toggle.classList.add('active');
                
                // Change chart type
                if (view === 'bar') {
                    growthChart.config.type = 'bar';
                    growthChart.data.datasets[0].backgroundColor = '#7c3aed';
                } else {
                    growthChart.config.type = 'line';
                    growthChart.data.datasets[0].backgroundColor = 'rgba(124, 58, 237, 0.1)';
                }
                
                growthChart.update();
            });
        });
    }
    
    return growthChart;
}

// Purchase Frequency Chart
function initPurchaseFrequencyChart() {
    const ctx = document.getElementById('purchaseFrequencyChart');
    if (!ctx) return;
    
    const isDark = document.documentElement.classList.contains('dark');
    
    const data = {
        labels: ['Once', '2-5 times', '6-10 times', '11+ times'],
        datasets: [{
            label: 'Customers',
            data: [35, 40, 15, 10],
            backgroundColor: [
                '#3b82f6',
                '#7c3aed',
                '#10b981',
                '#f59e0b'
            ],
            borderRadius: 5
        }]
    };
    
    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: isDark ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                    titleColor: isDark ? '#e5e7eb' : '#333',
                    bodyColor: isDark ? '#e5e7eb' : '#333',
                    callbacks: {
                        label: function(context) {
                            return `${context.raw}% of customers`;
                        }
                    }
                }
            }
        }
    };
    
    return new Chart(ctx, config);
}

// Customer Segments Chart
function initCustomerSegmentChart() {
    const ctx = document.getElementById('customerSegmentChart');
    if (!ctx) return;
    
    const isDark = document.documentElement.classList.contains('dark');
    
    const data = {
        labels: ['Loyal Customers', 'Regular Buyers', 'Occasional Shoppers'],
        datasets: [{
            label: 'Revenue',
            data: [32, 45, 23],
            backgroundColor: [
                '#7c3aed',
                '#3b82f6',
                '#10b981'
            ],
            borderWidth: 0
        }]
    };
    
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: isDark ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                    titleColor: isDark ? '#e5e7eb' : '#333',
                    bodyColor: isDark ? '#e5e7eb' : '#333',
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}% of revenue`;
                        }
                    }
                }
            }
        }
    };
    
    const segmentChart = new Chart(ctx, config);
    
    // Make segment items interactive
    const segmentItems = document.querySelectorAll('.segment-item');
    segmentItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            segmentItems.forEach(si => si.classList.remove('active'));
            item.classList.add('active');
            
            // Highlight the corresponding segment
            segmentChart.setActiveElements([{datasetIndex: 0, index: index}]);
            segmentChart.update();
        });
    });
    
    return segmentChart;
}

// Sector Growth Chart
function initSectorGrowthChart() {
    const ctx = document.getElementById('sectorGrowthChart');
    if (!ctx) return;
    
    const isDark = document.documentElement.classList.contains('dark');
    
    const data = {
        labels: ['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing', 'Energy'],
        datasets: [{
            label: '1 Year Growth',
            data: [25, 18, 15, 12, 8, 10],
            backgroundColor: '#7c3aed',
            borderColor: '#7c3aed',
            borderWidth: 0,
            borderRadius: 5
        }]
    };
    
    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: isDark ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                    titleColor: isDark ? '#e5e7eb' : '#333',
                    bodyColor: isDark ? '#e5e7eb' : '#333',
                    callbacks: {
                        label: function(context) {
                            return `Growth: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    };
    
    const sectorChart = new Chart(ctx, config);
    
    // Time range controls
    const timeRanges = document.querySelectorAll('.time-range');
    if (timeRanges.length) {
        const rangeData = {
            '1y': [25, 18, 15, 12, 8, 10],
            '2y': [42, 31, 27, 23, 15, 18],
            '5y': [68, 53, 45, 38, 30, 33]
        };
        
        timeRanges.forEach(range => {
            range.addEventListener('click', () => {
                const period = range.getAttribute('data-range');
                
                // Update active state
                timeRanges.forEach(btn => btn.classList.remove('active'));
                range.classList.add('active');
                
                // Update chart data
                if (rangeData[period]) {
                    sectorChart.data.datasets[0].data = rangeData[period];
                    sectorChart.data.datasets[0].label = `${period.toUpperCase()} Growth`;
                    sectorChart.update();
                }
            });
        });
    }
    
    return sectorChart;
}

// Initialize all forecast charts
function initForecastCharts() {
    // Revenue Forecast
    const revenueCtx = document.getElementById('revenueForecastChart');
    if (revenueCtx) {
        initLineChart(revenueCtx, 
            ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026', 'Q2 2026'],
            [1.8, 2.1, 2.4, 2.2, 2.5, 2.7],
            '#7c3aed',
            true
        );
    }
    
    // Customer Acquisition Forecast
    const acquisitionCtx = document.getElementById('acquisitionForecastChart');
    if (acquisitionCtx) {
        initLineChart(acquisitionCtx, 
            ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026', 'Q2 2026'],
            [1200, 1350, 1500, 1620, 1800, 1950],
            '#3b82f6',
            true
        );
    }
    
    // Product Demand Forecast
    const demandCtx = document.getElementById('demandForecastChart');
    if (demandCtx) {
        initLineChart(demandCtx, 
            ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026', 'Q2 2026'],
            [3200, 3600, 4100, 4800, 5100, 5400],
            '#10b981',
            true
        );
    }
}

// Helper to initialize line charts with consistent styling
function initLineChart(ctx, labels, data, color, showFill = false) {
    const isDark = document.documentElement.classList.contains('dark');
    
    const config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                borderColor: color,
                backgroundColor: showFill ? `${color}20` : 'transparent',
                borderWidth: 3,
                tension: 0.4,
                fill: showFill,
                pointBackgroundColor: color,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: isDark ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                    titleColor: isDark ? '#e5e7eb' : '#333',
                    bodyColor: isDark ? '#e5e7eb' : '#333',
                    displayColors: false
                }
            }
        }
    };
    
    return new Chart(ctx, config);
}

// Initialize chart control interactions
function initChartControls() {
    // Period controls for Revenue chart
    const periodButtons = document.querySelectorAll('.chart-period');
    if (periodButtons.length) {
        const periodData = {
            'monthly': {
                data: [45, 25, 20, 10],
                labels: ['Sales', 'Marketing', 'Operations', 'R&D']
            },
            'quarterly': {
                data: [40, 30, 15, 15],
                labels: ['Sales', 'Marketing', 'Operations', 'R&D']
            },
            'yearly': {
                data: [42, 28, 18, 12],
                labels: ['Sales', 'Marketing', 'Operations', 'R&D']
            }
        };
        
        periodButtons.forEach(button => {
            button.addEventListener('click', () => {
                const period = button.getAttribute('data-period');
                
                // Update active state
                periodButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update chart data
                const chart = Chart.getChart('revenuePieChart');
                if (chart && periodData[period]) {
                    chart.data.datasets[0].data = periodData[period].data;
                    chart.data.labels = periodData[period].labels;
                    chart.update();
                    
                    // Update legend percentages
                    const legendItems = document.querySelectorAll('#revenueLegend .legend-item');
                    legendItems.forEach((item, index) => {
                        const percentEl = item.querySelector('.legend-percent');
                        if (percentEl) {
                            percentEl.textContent = periodData[period].data[index] + '%';
                        }
                    });
                }
            });
        });
    }
}

// Helper function to check if dark theme is active
function isDarkTheme() {
    return document.documentElement.classList.contains('dark');
}

// Update chart colors when theme changes
document.getElementById('themeToggle')?.addEventListener('click', function() {
    setTimeout(() => {
        const isDark = isDarkTheme();
        
        // Get all charts and update their colors
        const chartIds = [
            'revenuePieChart', 
            'salesGrowthChart', 
            'purchaseFrequencyChart',
            'customerSegmentChart',
            'sectorGrowthChart',
            'revenueForecastChart',
            'acquisitionForecastChart',
            'demandForecastChart'
        ];
        
        chartIds.forEach(id => {
            const chart = Chart.getChart(id);
            if (chart) {
                // Update tooltip colors
                if (chart.options.plugins.tooltip) {
                    chart.options.plugins.tooltip.backgroundColor = isDark ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)';
                    chart.options.plugins.tooltip.titleColor = isDark ? '#e5e7eb' : '#333';
                    chart.options.plugins.tooltip.bodyColor = isDark ? '#e5e7eb' : '#333';
                }
                
                // Update grid colors
                if (chart.options.scales?.y?.grid) {
                    chart.options.scales.y.grid.color = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
                }
                
                // Update border colors for pie/doughnut charts
                if (chart.config.type === 'pie' || chart.config.type === 'doughnut') {
                    chart.data.datasets[0].borderColor = isDark ? '#1f2937' : '#ffffff';
                }
                
                chart.update();
            }
        });
    }, 300);
});