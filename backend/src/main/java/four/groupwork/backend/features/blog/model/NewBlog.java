package four.groupwork.backend.features.blog.model;

import lombok.Data;

import java.util.List;

@Data
public class NewBlog
{
    private String title;

    private String content;

    private List<String> hashtags;
  //  private String author;
}
